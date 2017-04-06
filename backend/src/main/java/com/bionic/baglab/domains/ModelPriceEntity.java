package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by nicot on 4/1/2017.
 */
@Entity
@Table(name = "model_price", schema = "baglab")
public class ModelPriceEntity {

    private Long id;
    private ModelEntity model;
    private Timestamp date;
    private Integer price;

    public ModelPriceEntity() {
    }

    public ModelPriceEntity(ModelEntity model, Integer price) {
        this.model = model;
        this.price = price;
        this.date = new Timestamp(System.currentTimeMillis());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "modelId")
    public ModelEntity getModel() {
        return model;
    }

    public void setModel(ModelEntity model) {
        this.model = model;
    }

    @Basic
    @Column(name = "date")
    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Basic
    @Column(name = "price")
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ModelPriceEntity that = (ModelPriceEntity) o;

        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = date != null ? date.hashCode() : 0;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }
}
