package com.bionic.baglab.services;

import com.bionic.baglab.dao.OrderDao;
import com.bionic.baglab.dao.OrderStatusDao;
import com.bionic.baglab.domains.*;
import com.bionic.baglab.dto.order.OrderDto;
import com.bionic.baglab.dto.order.OrderDtoCreate;
import com.bionic.baglab.dto.order.OrderItemDtoCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private OrderStatusDao orderStatusDao;

    @Autowired
    private ModelService modelService;

    @Autowired
    private BagTypeService bagTypeService;

    @Autowired
    private UserService userService;

    public Set<OrderDto> findAll() {
        List<OrderEntity> temp = orderDao.findAll();
        return temp.stream().map(OrderDto::new).collect(Collectors.toSet());
    }

    public OrderEntity findOne(Long id) {
        return orderDao.findOne(id);
    }

    @Transactional
    public OrderEntity save(OrderEntity orderEntity) {
        return orderDao.save(orderEntity);
    }

    public List<OrderDto> getAllOrdersByStatus(String status) {
        List<OrderEntity> ordersEntities = orderDao.findAllOrdersByOrderStatusCode(status);
        return ordersEntities.stream().map(OrderDto::new).collect(Collectors.toList());
    }

    public OrderDto createOrder(OrderDtoCreate orderDto) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setUser(userService.findEntityById(orderDto.getUserId()));
        orderEntity.setOrderStatus(orderStatusDao.findByCode("processing"));
        orderEntity.setItems(orderDto.getItems()
                .stream()
                .map(this::orderItemDto2Entity)
                .collect(Collectors.toList())
        );

        OrderEntity resOrderEntity = save(orderEntity);

        return getDtoFromEntity(resOrderEntity);
    }

    private OrderItemEntity orderItemDto2Entity(OrderItemDtoCreate orderItemDto) {
        Long modelId = orderItemDto.getModelId();

        ModelEntity modelEntity = modelService.findOne(modelId);
        BagTypeEntity bagTypeEntity = bagTypeService.findOne(modelEntity.getBagTypeId());
        int modelPrice = bagTypeEntity.getLastPrice();

        int count = orderItemDto.getCount();
        int orderItemPrice = modelPrice * count;

        return new OrderItemEntity(modelEntity, count, orderItemPrice);
    }

    private OrderDto getDtoFromEntity(OrderEntity orderEntity) {
        OrderDto orderDto = new OrderDto(orderEntity);
        return orderDto;
    }
}
