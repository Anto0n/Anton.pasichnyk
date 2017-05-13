package com.bionic.baglab.controllers;

import com.bionic.baglab.dto.OrderDto;
import com.bionic.baglab.dto.OrderDtoLight;
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
    public ResponseEntity createOrder(@Valid @RequestBody OrderDtoLight orderDto){
        OrderDto responseDto = orderService.createOrder(orderDto);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }
}
