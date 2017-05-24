package com.bionic.baglab.dto.order;

import com.bionic.baglab.domains.OrderEntity;
import com.bionic.baglab.dto.user.UserLightDto;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.stream.Collectors;

/**
 * Created by potaychuk on 29.03.2017.
 */
public class OrderDto {

    @NotNull(message = "error.idOrder.notnull")
    @NotEmpty(message = "error.idOrder.notempty")
    @Valid
    private  long idOrder;

    @NotNull(message = "error.moderatorId.notnull")
    @NotEmpty(message = "error.moderatorId.notempty")
    @Valid
    private  Long moderatorId;

    @NotNull(message = "error.userDto.notnull")
    @NotEmpty(message = "error.userDto.notempty")
    @Valid
    private  UserLightDto userDto;

    @NotNull(message = "error.status.notnull")
    @NotEmpty(message = "error.status.notempty")
    @Valid
    private  OrderStatusDTO status;
    private  Timestamp orderCreate;

    @NotNull(message = "error.OrderItem.notnull")
    @Valid
    private Collection<OrderItemDto> items;

    public OrderDto() {
    }

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
