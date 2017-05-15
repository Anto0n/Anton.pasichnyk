package com.bionic.baglab.dto.order;

import com.bionic.baglab.domains.OrderItemEntity;
import com.bionic.baglab.dto.ModelDto;
import io.swagger.annotations.ApiModel;

/**
 * Created by nicot on 5/16/2017.
 */
@ApiModel
public class OrderItemDto {

    private final ModelDto model;
    private final int count;
    private final int price;

    public OrderItemDto(OrderItemEntity orderItemEntity) {
        this.model = new ModelDto(orderItemEntity.getModelEntity());
        this.count = orderItemEntity.getCount();
        this.price = orderItemEntity.getPrice();
    }

    public ModelDto getModel() {
        return model;
    }

    public int getCount() {
        return count;
    }

    public int getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "model=" + model +
                ", count=" + count +
                ", price=" + price +
                '}';
    }
}
