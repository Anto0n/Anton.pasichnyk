package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by potaychuk on 28.03.2017.
 */
@Entity
@Table(name = "[order]", schema = "baglab")
public class OrderEntity {
    private long idOrder;
    private UserEntity user;
    private OrderStatusEntity orderStatus;
    private Timestamp orderCreate;
    private Timestamp orderUpdate;
    private Collection<ModelEntity> models;

    @Id
    @Column(name = "[idOrder]", columnDefinition = "INT(11)")
    public long getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(long idOrder) {
        this.idOrder = idOrder;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "[userId]", columnDefinition = "INT(11)")
    public UserEntity getUser() {
        return this.user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "[orderStatusId]", columnDefinition = "INT(11)")
    public OrderStatusEntity getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatusEntity orderStatusId) {
        this.orderStatus = orderStatusId;
    }

    @Column(name = "[orderCreate]")
    public Timestamp getOrderCreate() {
        return orderCreate;
    }

    public void setOrderCreate(Timestamp orderCreate) {
        this.orderCreate = orderCreate;
    }

    @Column(name = "[orderUpdate]")
    public Timestamp getOrderUpdate() {
        return orderUpdate;
    }

    public void setOrderUpdate(Timestamp orderUpdate) {
        this.orderUpdate = orderUpdate;
    }

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "orders")
    public Collection<ModelEntity> getModels() {
        return models;
    }

    public void setModels(Collection<ModelEntity> models) {
        this.models = models;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderEntity that = (OrderEntity) o;

        if (idOrder != that.idOrder) return false;
        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        if (orderStatus != null ? !orderStatus.equals(that.orderStatus) : that.orderStatus != null) return false;
        if (orderCreate != null ? !orderCreate.equals(that.orderCreate) : that.orderCreate != null) return false;
        if (orderUpdate != null ? !orderUpdate.equals(that.orderUpdate) : that.orderUpdate != null) return false;
        return models != null ? models.equals(that.models) : that.models == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (idOrder ^ (idOrder >>> 32));
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (orderStatus != null ? orderStatus.hashCode() : 0);
        result = 31 * result + (orderCreate != null ? orderCreate.hashCode() : 0);
        result = 31 * result + (orderUpdate != null ? orderUpdate.hashCode() : 0);
        result = 31 * result + (models != null ? models.hashCode() : 0);
        return result;
    }
}
