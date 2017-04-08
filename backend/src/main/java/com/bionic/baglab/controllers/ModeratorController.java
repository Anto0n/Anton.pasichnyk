package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderStatusEntity;
import com.bionic.baglab.dto.OrderDto;
import com.bionic.baglab.services.OrderService;
import com.bionic.baglab.services.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * Created by potaychuk on 28.03.2017.
 */
@RestController
public class ModeratorController {
    @Autowired
    OrderService orderService;
    @Autowired
    OrderStatusService orderStatusService;


    @RequestMapping(value = "/orders")
    @ResponseBody
    public Set<OrderDto> getOrders() {
        return orderService.findAll();
    }

    @RequestMapping(value = "/order/{id}/{action}")
    @ResponseBody
    public void acceptOrder(@PathVariable long id, @PathVariable String action) {
        OrderEntity oe = orderService.findOne(id);
        OrderStatusEntity ose = orderStatusService.findByCode(action);
        if (!oe.getOrderStatus().equals(ose)){
            oe.setOrderStatus(ose);
            orderService.save(oe);
        }
    }

}
