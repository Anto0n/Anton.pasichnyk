package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.dto.JResponse;
import com.bionic.baglab.dto.enums.OrderStatusNameEnum;
import com.bionic.baglab.dto.order.*;
import com.bionic.baglab.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Iterator;
import java.util.Set;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    public OrderDto createOrder(@Valid @RequestBody OrderDtoCreate orderDto) {
        return orderService.createOrder(orderDto);
    }

    @GetMapping("/listOrders")
    public Set<OrderDto> listOrders() {
        return orderService.findAll();
    }

    //TODO security check, get user id from principal and save it as moderator id!!
    @PutMapping("/changeStatus")
    public OrderDto changeOrderStatus(@Valid @RequestBody OrderStatusChangeDTO orderStatusChangeDTO) {

        return orderService.changeStatus(orderStatusChangeDTO.getOrderId(),
                orderStatusChangeDTO.getOrderStatusNameEnum());
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
        Set<OrderDto> set = null;
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
        Set<OrderDto> set = null;
        try{
            set = orderService.getOrderByUserIdAndStatus(userId, statusCode);
        } catch (Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(set, HttpStatus.OK);
    }

    @GetMapping("/findall/{userid}")
    public ResponseEntity<Set<OrderDto>> getOrdersByUserId(@PathVariable("userid") long userId){
        Set<OrderDto> set = null;
        try{
            set = orderService.getAllOrdersByUserId(userId);
        } catch(Exception ex){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(set, HttpStatus.OK);
    }
}
