package com.bionic.baglab.dto.order;


import com.bionic.baglab.dto.enums.OrderStatusNameEnum;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * DTO used for change order status
 */
public class OrderStatusChangeDTO {

    @NotNull(message = "error.idOrder.notnull")
    @Valid
    private long orderId;

    @NotNull(message = "error.orderStatusName.notnull")
    @Valid
    private OrderStatusNameEnum orderStatusNameEnum;

    public OrderStatusChangeDTO() {
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public OrderStatusNameEnum getOrderStatusNameEnum() {
        return orderStatusNameEnum;
    }

    public void setOrderStatusNameEnum(OrderStatusNameEnum orderStatusNameEnum) {
        this.orderStatusNameEnum = orderStatusNameEnum;
    }
}
