package com.bionic.baglab.services;

import com.bionic.baglab.dao.OrderDao;
import com.bionic.baglab.dao.OrderStatusDao;
import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.dto.OrderDto;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by potaychuk on 29.03.2017.
 */
@Service
public class OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    OrderStatusDao orderStatusDao;

    public Set<OrderDto> findAll(){
        List<OrderEntity> temp = orderDao.findAll();
        return temp.stream().map(OrderDto::new).collect(Collectors.toSet());
    }

    public OrderEntity findOne(Long id){
        return orderDao.findOne(id);
    }

    @Transactional
    public OrderEntity save(OrderEntity orderEntity){
        return orderDao.save(orderEntity);
    }

    public List<OrderDto> getAllOrdersByStatus(String status){
        List<OrderEntity> ordersEntities = orderDao.findAllOrdersByOrderStatusCode(status);
        return ordersEntities.stream().map(OrderDto::new).collect(Collectors.toList());
    }

}
