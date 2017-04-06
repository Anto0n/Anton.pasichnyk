package com.bionic.baglab.dao;

import com.bionic.baglab.domains.OrderStatusEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by potaychuk on 30.03.2017.
 */
public interface OrderStatusDao extends CrudRepository<OrderStatusEntity, Long> {
    List<OrderStatusEntity> findAll();
    OrderStatusEntity findOne(Long id);
    OrderStatusEntity findByCode(String code);
}
