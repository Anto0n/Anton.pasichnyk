package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderStatusEntity;
import com.bionic.baglab.dto.enums.OrderStatusNameEnum;
import com.bionic.baglab.dto.order.OrderDto;
import com.bionic.baglab.services.OrderService;
import com.bionic.baglab.services.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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


    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    public List<OrderDto> getOrders() {
        return orderService.findAll();
    }

    @RequestMapping(value = "/order/{id}/{action}", method = RequestMethod.PUT)
    public void acceptOrder(@PathVariable long id, @PathVariable OrderStatusNameEnum action) {
        OrderEntity oe = orderService.findOne(id);
        OrderStatusEntity ose = orderStatusService.findByCode(action);
        if (!oe.getOrderStatus().equals(ose)){
            oe.setOrderStatus(ose);
            orderService.save(oe);
        }
    }

}
