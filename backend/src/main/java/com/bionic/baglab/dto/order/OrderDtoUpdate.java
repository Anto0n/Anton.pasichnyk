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

    @NotNull(message = "userId should exist")
    private final Long userId;

    @NotNull(message = "items should exist")
    @NotEmpty(message = "items should not be empty")
    @Valid
    private final Long orderId;
    @NotEmpty(message = "items should not be empty")
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