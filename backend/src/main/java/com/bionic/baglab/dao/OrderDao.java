package com.bionic.baglab.dao;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.OrderItemEntity;
import com.bionic.baglab.dto.enums.OrderStatusNameEnum;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by potaychuk on 28.03.2017.
 */
@Transactional
public interface OrderDao extends CrudRepository<OrderEntity, Long> {
    List<OrderEntity> findAll();
    List<OrderEntity> findAllByUserIdUser(long iduser);
    OrderEntity findOne(Long id);
    OrderEntity save(OrderEntity orderEntity);
    List<OrderEntity> findAllOrdersByOrderStatusCode(OrderStatusNameEnum statusCode);
    List <OrderEntity> findAllOrderByUserIdUserAndOrderStatusCode(Long uid, OrderStatusNameEnum statusCode);
    //void deleteOrderItemsByIdOrder(long oid);


}
