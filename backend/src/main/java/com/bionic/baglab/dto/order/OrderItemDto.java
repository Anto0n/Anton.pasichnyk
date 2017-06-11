package com.bionic.baglab.dto.order;

import com.bionic.baglab.domains.OrderItemEntity;
import com.bionic.baglab.dto.model.ModelDto;
import io.swagger.annotations.ApiModel;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * Created by nicot on 5/16/2017.
 */
@ApiModel
public class OrderItemDto {

    @NotNull(message = "error.idOrderItem.notnull")
    @Valid
    private long idOrderItem;

    @NotNull(message = "error.model.notnull")
    @NotEmpty(message = "error.model.notempty")
    @Valid
    private  ModelDto models;

    @NotNull(message = "error.count.notnull")
    @Valid
    private  int count;

    @NotNull(message = "error.price.notnull")
    @Valid
    private  int price;

    public OrderItemDto() {
    }

    public OrderItemDto(OrderItemEntity orderItemEntity) {
        this.idOrderItem = orderItemEntity.getIdOrderItem();
        this.models = new ModelDto(orderItemEntity.getModelEntity());
        this.count = orderItemEntity.getCount();
        this.price = orderItemEntity.getPrice();
    }

    public ModelDto getModel() {
        return models;
    }

    public int getCount() {
        return count;
    }

    public int getPrice() {
        return price;
    }

    public long getIdOrderItem() {return  idOrderItem;}

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "idOrderItem=" + idOrderItem +
                "model=" + models +
                ", count=" + count +
                ", price=" + price +
                '}';
    }
}
