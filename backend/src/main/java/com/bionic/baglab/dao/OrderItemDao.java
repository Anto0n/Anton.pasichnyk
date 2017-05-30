package com.bionic.baglab.dao;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderItemEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface OrderItemDao extends CrudRepository<OrderItemEntity, Long> {
    void deleteOrderItemEntityByIdOrderItem(long orderId);
}
