package com.bionic.baglab.dto.order;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel
public class OrderDtoCreate {

    @NotNull(message = "userId should exist")
    private final Long userId;

    @NotNull(message = "items should exist")
    @NotEmpty(message = "items should not be empty")
    @Valid
    private final List<OrderItemDtoCreate> items;

    @JsonCreator
    public OrderDtoCreate(@JsonProperty("userId") Long userId,
                          @JsonProperty("items") List<OrderItemDtoCreate> items) {
        this.userId = userId;
        this.items = items;
    }

    public long getUserId() {
        return userId;
    }

    public List<OrderItemDtoCreate> getItems() {
        return items;
    }

    @Override
    public String toString() {
        return "OrderDtoLight{" +
                "userId=" + userId +
                ", items=" + items +
                '}';
    }
}
