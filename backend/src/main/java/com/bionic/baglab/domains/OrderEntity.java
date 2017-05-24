package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "[order]", schema = "baglab")
public class OrderEntity {

    @Id
    @GeneratedValue
    @Column(name = "[idOrder]", columnDefinition = "INT(11)")
    private Long idOrder;

    @Column(name = "[moderatorId]")
    private Long moderatorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "[userId]")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "[orderStatusId]")
    //@Enumerated(EnumType.ORDINAL)
    private OrderStatusEntity orderStatus;

    @Column(name = "[orderCreate]")
    private Timestamp orderCreate = Timestamp.from(Instant.now());

    @Column(name = "[orderUpdate]")
    private Timestamp orderUpdate = Timestamp.from(Instant.now());

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "orderId", nullable = false)
    private Collection<OrderItemEntity> items = new ArrayList<>();

    public Long getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(Long idOrder) {
        this.idOrder = idOrder;
    }

    public Long getModeratorId() {
        return moderatorId;
    }

    public void setModeratorId(Long moderatorId) {
        this.moderatorId = moderatorId;
    }

    public UserEntity getUser() {
        return this.user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public OrderStatusEntity getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatusEntity orderStatusId) {
        this.orderStatus = orderStatusId;
    }

    public Timestamp getOrderCreate() {
        return orderCreate;
    }

    public void setOrderCreate(Timestamp orderCreate) {
        this.orderCreate = orderCreate;
    }

    public Timestamp getOrderUpdate() {
        return orderUpdate;
    }

    public void setOrderUpdate(Timestamp orderUpdate) {
        this.orderUpdate = orderUpdate;
    }

    public Collection<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(Collection<OrderItemEntity> items) {
        this.items = items;
    }
}
