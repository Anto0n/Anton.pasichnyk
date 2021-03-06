package com.bionic.baglab.domains;

import com.bionic.baglab.dto.enums.OrderStatusNameEnum;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by potaychuk on 28.03.2017.
 */
@Entity
@Table(name = "[order_status]", schema = "baglab")
public class OrderStatusEntity {
    private long idOrderStatus;
    private OrderStatusNameEnum code;
    private String description;
    private Collection<OrderEntity> orders;
    //    private int deleted;

    public OrderStatusEntity() {
    }

    @Id
    @Column(name = "[idOrderStatus]", columnDefinition = "INT(11)")
    public long getIdOrderStatus() {
        return idOrderStatus;
    }

    public void setIdOrderStatus(long idOrderStatus) {
        this.idOrderStatus = idOrderStatus;
    }

    @Column(name = "[code]")
    @Enumerated(EnumType.STRING)
    public OrderStatusNameEnum getCode() {
        return code;
    }
    public void setCode(OrderStatusNameEnum code) {
        this.code = code;
    }


    @Column(name = "[description]", columnDefinition = "MEDIUMTEXT")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @OneToMany(mappedBy = "orderStatus")
    public Collection<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(Collection<OrderEntity> orders) {
        this.orders = orders;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderStatusEntity that = (OrderStatusEntity) o;

        if (idOrderStatus != that.idOrderStatus) return false;
        if (code != null ? !code.equals(that.code) : that.code != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        return orders != null ? orders.equals(that.orders) : that.orders == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (idOrderStatus ^ (idOrderStatus >>> 32));
        result = 31 * result + (code != null ? code.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (orders != null ? orders.hashCode() : 0);
        return result;
    }
}
