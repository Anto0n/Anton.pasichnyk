package com.bionic.baglab.dto.order;

import com.bionic.baglab.domains.OrderStatusEntity;
import com.bionic.baglab.dto.enums.OrderStatusNameEnum;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * Created by potaychuk on 29.03.2017.
 */
public class OrderStatusDTO {

    @NotNull(message = "error.code.notnull")
    @Valid
    private OrderStatusNameEnum codeEnum;

    @NotNull(message = "error.description.notnull")
    @Valid
    private String description;

    public OrderStatusDTO() {
    }

    public OrderStatusDTO(OrderStatusEntity orderStatusEntity) {
        this.codeEnum = orderStatusEntity.getCode();
        this.description = orderStatusEntity.getDescription();
    }

    public OrderStatusDTO(OrderStatusNameEnum code, String description) {
        this.codeEnum = code;
        this.description = description;
    }

    public OrderStatusNameEnum getCode() {
        return codeEnum;
    }

    public void setCode(OrderStatusNameEnum code) {
        this.codeEnum = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderStatusDTO that = (OrderStatusDTO) o;
        if (codeEnum != that.codeEnum) return false;
        return description != null ? description.equals(that.description) : that.description == null;
    }

    @Override
    public int hashCode() {
        int result = codeEnum != null ? codeEnum.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}
