package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.order.OrderDto;
import com.bionic.baglab.dto.order.OrderDtoCreate;
import com.bionic.baglab.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    public OrderDto createOrder(@Valid @RequestBody OrderDtoCreate orderDto){
        return orderService.createOrder(orderDto);
    }
}
