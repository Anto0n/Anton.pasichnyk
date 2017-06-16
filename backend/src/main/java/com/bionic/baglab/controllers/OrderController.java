package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.JResponse;
import com.bionic.baglab.dto.enums.OrderStatusNameEnum;
import com.bionic.baglab.dto.order.*;
import com.bionic.baglab.mail.MailSender;
import com.bionic.baglab.mail.template.TemplateEngine;
import com.bionic.baglab.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private MailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @PostMapping("/createOrder")
    public OrderDto createOrder(@Valid @RequestBody OrderDtoCreate orderDto) {
        return orderService.createOrder(orderDto);
    }

    @GetMapping("/listOrders")
    public List<OrderDto> listOrders() {
        return orderService.findAll();
    }


    @PutMapping("/changeStatus")
    public OrderDto changeOrderStatus(@Valid @RequestBody OrderStatusChangeDTO orderStatusChangeDTO) {
        OrderDto dto = orderService.changeStatus(orderStatusChangeDTO.getOrderId(),
            orderStatusChangeDTO.getOrderStatusNameEnum());
        String userName = orderService.findOne(orderStatusChangeDTO.getOrderId()).getUser().getFirstname();
        String orderId = String.valueOf(orderStatusChangeDTO.getOrderId());
        String email =  orderService.findOne(orderStatusChangeDTO.getOrderId()).getUser().getEmail();
        if (orderStatusChangeDTO.getOrderStatusNameEnum().equals(OrderStatusNameEnum.ACCEPTED) && dto != null) {
            String subject = "Your order on Baglab.com is approved";
            String template = "approve_order.html";
            sendMail(userName, orderId, email, subject, template);
        }
        if (orderStatusChangeDTO.getOrderStatusNameEnum().equals(OrderStatusNameEnum.DENIED) && dto != null) {
            String subject = "Your order on Baglab.com is denied";
            String template = "deny_order.html";
            sendMail(userName, orderId, email, subject, template);
        }
        if (orderStatusChangeDTO.getOrderStatusNameEnum().equals(OrderStatusNameEnum.SEND) && dto != null) {
            String subject = "Your order on Baglab.com is sent";
            String template = "sent_order.html";
            sendMail(userName, orderId, email, subject, template);
        }
        return dto;
    }

    private void sendMail(String userName, String orderId, String email, String subject, String template) {
        String body = templateEngine.build(template, new HashMap<String,String>() {{
            put("name", userName);
            put("id", orderId);
        }});
        boolean success = mailSender.sendMail(email, subject, body);
        System.out.println("Mail success: " + success);
    }

    //TODO add security check
    /**
     * @param orderDto add  item(s) to Order
     * @return OrderDto
     */
    @PutMapping("/additems")
    public OrderDto updateOrder(@Valid @RequestBody OrderDtoUpdate orderDto) {
        return orderService.changeOrder(orderDto);
    }

    //TODO double check on FE if user is sure
    @DeleteMapping("/deleteOrder/{orderId}")
    public ResponseEntity deleteOrder(@PathVariable("orderId") long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     *
     * @param orderid - delete all items from specified order
     * @return true
     */
    @DeleteMapping("/cleanbucket/{orderId}")
    public ResponseEntity<JResponse> deleteItemsFromBucket(@PathVariable("orderId") long orderid){
        boolean result = false;
        result = orderService.deleteItemsInOrderBucket (orderid);
        JResponse resp = new JResponse("error");
        if(result){
            resp.setResponseMessage("success");
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    /**
     * If bucket is not exist, create new one.
     * @param userId
     * @return Order with Status.BUCKET by user Id (if exist)
     */
    @GetMapping("/findbucket/{userid}")
    public ResponseEntity getBucketByUserId(@PathVariable("userid") long userId){
        List<OrderDto> set = null;
        OrderDto dto = null;
        try{
           set = orderService.getOrderByUserIdAndStatus(userId, OrderStatusNameEnum.BUCKET);
           if(set.isEmpty()){           // No bucket found
               set.add(orderService.createBucket(userId, OrderStatusNameEnum.BUCKET));
           }
            Iterator iter = set.iterator();

            dto = (OrderDto) iter.next();
           //dto = set.iterator().next(); // get first
        } catch (Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @GetMapping("/findall/{userid}/{status}")
    public ResponseEntity getOrdersByUserIdAndStatus(@PathVariable("userid") long userId, @PathVariable("status") OrderStatusNameEnum statusCode ){
        List<OrderDto> set = null;
        try{
            set = orderService.getOrderByUserIdAndStatus(userId, statusCode);
        } catch (Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(set, HttpStatus.OK);
    }

    @GetMapping("/findallByStatus/{status}")
    public ResponseEntity getOrdersByStatus(@PathVariable("status") OrderStatusNameEnum statusCode ){
        List<OrderDto> list = null;
        try{
            list = orderService.getOrderByStatus(statusCode);
        } catch (Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/findall/{userid}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable("userid") long userId){
        List<OrderDto> list = null;
        try{
            list = orderService.getAllOrdersByUserId(userId);
        } catch(Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(list, HttpStatus.OK);
    }
}
