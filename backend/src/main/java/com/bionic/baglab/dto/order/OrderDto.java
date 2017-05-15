package com.bionic.baglab.dto.order;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.dto.ModelDto;
import com.bionic.baglab.dto.OrderStatusDTO;
import com.bionic.baglab.dto.user.UserLightDto;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.LinkedList;
import java.util.stream.Collectors;

/**
 * Created by potaychuk on 29.03.2017.
 */
public class OrderDto {

    private final long idOrder;
    private final Long moderatorId;
    private final UserLightDto userDto;
    private final OrderStatusDTO status;
    private final Timestamp orderCreate;
    private final Collection<OrderItemDto> items;

    public OrderDto(OrderEntity orderEntity) {
        this.idOrder = orderEntity.getIdOrder();
        this.moderatorId = orderEntity.getModeratorId();
        this.userDto = new UserLightDto(orderEntity.getUser());
        this.status = new OrderStatusDTO(orderEntity.getOrderStatus());
        this.orderCreate = orderEntity.getOrderCreate();
        this.items = orderEntity.getItems().stream()
                .map(OrderItemDto::new)
                .collect(Collectors.toList());
    }

    public long getIdOrder() {
        return idOrder;
    }

    public Long getModeratorId() {
        return moderatorId;
    }

    public UserLightDto getUserDto() {
        return userDto;
    }

    public OrderStatusDTO getStatus() {
        return status;
    }

    public Timestamp getOrderCreate() {
        return orderCreate;
    }

    public Collection<OrderItemDto> getItems() {
        return items;
    }

    public int getSumPrice() {
        return getItems().stream()
                .mapToInt(OrderItemDto::getPrice)
                .sum();
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "idOrder=" + idOrder +
                ", moderatorId=" + moderatorId +
                ", userDto=" + userDto +
                ", status=" + status +
                ", orderCreate=" + orderCreate +
                ", items=" + items +
                '}';
    }
}
