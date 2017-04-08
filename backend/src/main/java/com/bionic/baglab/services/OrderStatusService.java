package com.bionic.baglab.services;

import com.bionic.baglab.dao.OrderStatusDao;
import com.bionic.baglab.domains.OrderStatusEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by potaychuk on 30.03.2017.
 */
@Service
public class OrderStatusService {

    @Autowired
    OrderStatusDao orderStatusDao;

    public List<OrderStatusEntity> getAll(){
        return orderStatusDao.findAll();
    }

    public OrderStatusEntity findOne(long id){
        return orderStatusDao.findOne(id);
    }

    public OrderStatusEntity findByCode(String code){
        return orderStatusDao.findByCode(code);
    }
}
