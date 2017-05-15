package com.bionic.baglab.dto.order;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * Created by nicot on 5/15/2017.
 */
@ApiModel
public class OrderItemDtoCreate {

    @NotNull(message = "modelId should exist")
    private final Long modelId;

    @NotNull(message = "count should exist")
    @Min(value = 1, message = "count should be >= 1")
    private final Integer count;

    @JsonCreator
    public OrderItemDtoCreate(@JsonProperty("modelId") Long modelId,
                              @JsonProperty("count") Integer count) {
        this.modelId = modelId;
        this.count = count;
    }

    public Long getModelId() {
        return modelId;
    }

    public Integer getCount() {
        return count;
    }

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "modelId=" + modelId +
                ", count=" + count +
                '}';
    }
}
