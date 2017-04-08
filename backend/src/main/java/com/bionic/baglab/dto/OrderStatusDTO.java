package com.bionic.baglab.dto;

import com.bionic.baglab.domains.OrderStatusEntity;

/**
 * Created by potaychuk on 29.03.2017.
 */
public class OrderStatusDTO {

    private String code;
    private String description;

    public OrderStatusDTO() {
    }

    public OrderStatusDTO(OrderStatusEntity orderStatusEntity) {
        this.code = orderStatusEntity.getCode();
        this.description = orderStatusEntity.getDescription();
    }

    public OrderStatusDTO(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

        if (code != null ? !code.equals(that.code) : that.code != null) return false;
        return description != null ? description.equals(that.description) : that.description == null;

    }

    @Override
    public int hashCode() {
        int result = code != null ? code.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}
