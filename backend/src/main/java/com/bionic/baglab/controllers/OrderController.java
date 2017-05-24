package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.dto.order.OrderDto;
import com.bionic.baglab.dto.order.OrderDtoCreate;
import com.bionic.baglab.dto.order.OrderDtoUpdate;
import com.bionic.baglab.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.Instant;
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
    public OrderDto changeOrderStatus(@PathVariable("id") long orderId,
                                      @PathVariable("status_id") long orderStatusId) {

        return orderService.changeStatus(orderId, orderStatusId);
    }

    //TODO add security check
    @PutMapping("/changeOrder")
    public OrderDto updateOrder(@Valid @RequestBody OrderDtoUpdate orderDto) {
        return orderService.changeOrder(orderDto);
    }

    //TODO double check on FE if user is sure
    @DeleteMapping("/deleteOrder")
    public ResponseEntity deleteOrder(@PathVariable("orderId") long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
