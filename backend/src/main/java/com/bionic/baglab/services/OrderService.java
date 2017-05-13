package com.bionic.baglab.services;

import com.bionic.baglab.dao.OrderDao;
import com.bionic.baglab.dao.OrderStatusDao;
import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.domains.ModelsOrderEntity;
import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.dto.OrderDto;
import com.bionic.baglab.dto.OrderDtoLight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.AssertTrue;
import java.sql.Timestamp;
import java.time.Instant;
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

    public OrderDto createOrder(OrderDtoLight orderDto) {
        OrderEntity orderEntity = new OrderEntity();
        Long id = orderDto.getUserId();
        UserEntity user = userService.findEntityById(id);
        orderEntity.setUser(user);
        List<ModelEntity> models = new ArrayList<>();

        for (Long modelId : orderDto.getModelsId()) {
            models.add(modelService.findOne(modelId));
        }
        orderEntity.setModels(models);
        orderEntity.setOrderCreate(Timestamp.from(Instant.now()));
        orderEntity.setOrderUpdate(Timestamp.from(Instant.now()));
        orderEntity.setOrderStatus(orderStatusDao.findByCode("processing"));
        save(orderEntity);

        return getDtoFromEntity(orderEntity);
    }

    public OrderDto getDtoFromEntity(OrderEntity orderEntity){
        OrderDto orderDto = new OrderDto(orderEntity);
        return orderDto;
    }
}
