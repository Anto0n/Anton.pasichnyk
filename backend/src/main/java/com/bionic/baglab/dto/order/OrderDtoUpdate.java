package com.bionic.baglab.dto.order;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel
public class OrderDtoUpdate {

    @NotNull(message = "error.UserId.notnull")
    private final Long userId;

    @NotNull(message = "error.orderId.notnull")
    @Valid
    private final Long orderId;

    @NotNull(message = "error.orderItems.notnull")
    @Valid
    private final List<OrderItemDtoCreate> items;

    @JsonCreator
    public OrderDtoUpdate(@JsonProperty("userId") Long userId,
                          @JsonProperty("orderId") Long orderId,
                          @JsonProperty("items") List<OrderItemDtoCreate> items) {
        this.userId = userId;
        this.orderId = orderId;
        this.items = items;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public List<OrderItemDtoCreate> getItems() {
        return items;
    }
}