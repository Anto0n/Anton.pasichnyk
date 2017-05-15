package com.bionic.baglab.domains;

import javax.persistence.*;

@Entity
@Table(name = "order_item")
public class OrderItemEntity {

    private Long idOrderItem;
    private ModelEntity modelEntity;
    private int count;
    private int price;

    public OrderItemEntity(ModelEntity modelEntity, int count, int price) {
        this.modelEntity = modelEntity;
        this.count = count;
        this.price = price;
    }

    @Id @GeneratedValue
    public Long getIdOrderItem() {
        return idOrderItem;
    }

    public void setIdOrderItem(Long idOrderItem) {
        this.idOrderItem = idOrderItem;
    }

    @ManyToOne
    @JoinColumn(name = "modelId")
    public ModelEntity getModelEntity() {
        return modelEntity;
    }

    public void setModelEntity(ModelEntity modelEntity) {
        this.modelEntity = modelEntity;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
