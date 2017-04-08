package com.bionic.baglab.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;

import static java.util.Comparator.comparing;

/**
 * Created by potaychuk on 29.03.2017.
 */
@Entity
@Table(name = "[model]", schema = "baglab")
public class ModelEntity {
    private long idModel;
    private Timestamp modelCreate;
    private Timestamp modelUpdate;
//    private boolean deleted;
    private UserEntity user;
    private Collection<OrderEntity> orders;
//    private List<ModelPriceEntity> priceEntities;

    @Id
    @Column(name = "[idModel]", columnDefinition = "INT(11)")
    public long getIdModel() {
        return idModel;
    }

    public void setIdModel(long idModel) {
        this.idModel = idModel;
    }

    @Basic
    @Column(name = "[modelCreate]")
    public Timestamp getModelCreate() {
        return modelCreate;
    }

    public void setModelCreate(Timestamp modelCreate) {
        this.modelCreate = modelCreate;
    }

    @Basic
    @Column(name = "[modelUpdate]")
    public Timestamp getModelUpdate() {
        return modelUpdate;
    }

    public void setModelUpdate(Timestamp modelUpdate) {
        this.modelUpdate = modelUpdate;
    }

//    @Basic
//    @Column(name = "[deleted]")
//    public boolean getDeleted() {
//        return deleted;
//    }
//
//    public void setDeleted(boolean deleted) {
//        this.deleted = deleted;
//    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "[userId]", columnDefinition = "INT(11)")
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "models_order", catalog = "baglab", joinColumns = {
            @JoinColumn(name = "modelId") },inverseJoinColumns = {
            @JoinColumn(name = "orderId") })
    public Collection<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(Collection<OrderEntity> orders) {
        this.orders = orders;
    }

//    @OneToMany(mappedBy = "[model]", cascade = CascadeType.ALL)
//    @JsonIgnore
//    public List<ModelPriceEntity> getPriceEntities() {
//        return priceEntities;
//    }
//
//    public void setPriceEntities(List<ModelPriceEntity> priceEntities) {
//        this.priceEntities = priceEntities;
//    }
//
//    @Transient
//    public Integer getPrice() {
//        return !priceEntities.isEmpty()
//                ? priceEntities.get(priceEntities.size()-1).getPrice()
//                : null;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ModelEntity that = (ModelEntity) o;

        if (idModel != that.idModel) return false;
        if (modelCreate != null ? !modelCreate.equals(that.modelCreate) : that.modelCreate != null) return false;
        if (modelUpdate != null ? !modelUpdate.equals(that.modelUpdate) : that.modelUpdate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        long result = idModel;
        result = 31 * result + (modelCreate != null ? modelCreate.hashCode() : 0);
        result = 31 * result + (modelUpdate != null ? modelUpdate.hashCode() : 0);
        return (int)result;
    }
}
