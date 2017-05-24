package com.bionic.baglab.controllers;


import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderStatusEntity;
import com.bionic.baglab.dto.enums.OrderStatusEnum;
import com.bionic.baglab.dto.order.OrderDto;
import com.bionic.baglab.dto.user.UserDto;
import com.bionic.baglab.services.OrderService;
import com.bionic.baglab.services.OrderStatusService;
import com.bionic.baglab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * China-manager controller
 */

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final String MANAGER_ROLE = "Factory"; //todo: delete temp constant
    private final String ORDER_STATUS = "accepted";

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderStatusService orderStatusService;


    /**
     *
     * @return List of USERS with ROLE  "Factory"
     */
    @GetMapping(value = "/list") //
    public ResponseEntity<Set<UserDto>> listAllManagers(){
        Set<UserDto> managers = userService.getAllUsersByRole(MANAGER_ROLE);
            if(managers.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);// HttpStatus.NOT_FOUND
            }
        return new ResponseEntity<>(managers, HttpStatus.OK);
    }

    /**
     *
     * @return List all orders that was approved by Moderator + models in them
     */
    @GetMapping(value = "/orders")
    public ResponseEntity<List<OrderDto>> listApprovedOrders(){
        List<OrderDto> orders = orderService.getAllOrdersByStatus(ORDER_STATUS);
        if(orders.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /**
     * Manager. Change orders status to "send"
     * @param id - order id
     * @param action - new order status
     */
    @PutMapping(value = "/changeOrderStatus/{id}/{action}") //todo: add limitation to possible actions for Order status
    @ResponseBody
    public ResponseEntity<Void> acceptOrder(@PathVariable long id, @PathVariable OrderStatusEnum action) {
        OrderEntity orderEntity;
        OrderStatusEntity orderStatusEntity;                                                    //todo: Move to Service
        try {
            orderEntity = orderService.findOne(id);
            orderStatusEntity = orderStatusService.findByCode(action);
        } catch (Exception ex ) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(orderEntity == null || orderStatusEntity == null )
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            if (!orderEntity.getOrderStatus().equals(orderStatusEntity)){
                orderEntity.setOrderStatus(orderStatusEntity);
                orderService.save(orderEntity);
                return new ResponseEntity<>(HttpStatus.OK);
            }  else
                return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }

    }






