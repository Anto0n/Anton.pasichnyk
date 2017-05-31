package com.bionic.baglab.dao;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderItemEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Transactional
public interface OrderItemDao extends CrudRepository<OrderItemEntity, Long> {

    @Override
    void delete(Iterable<? extends OrderItemEntity> entities);
    //void deleteOrderItemEntityByIdOrderItem(long orderId);

   // void delete(List<OrderItemEntity> ent);

}
