package com.bionic.baglab.domains;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;

@Entity
@Table(name = "material", schema = "baglab")
public class MaterialEntity {

    @Id
    @GeneratedValue
    @Column(name = "idmaterial")
    private long id;

    @Column(name = "[image]", columnDefinition="MEDIUMTEXT")
    private String image;

    @Column(name = "name")
    private String name;

    @Column(name = "deleted", columnDefinition = "bit(1)")
    private boolean deleted = false;

    @OneToMany(mappedBy = "material", targetEntity = MaterialPriceEntity.class, orphanRemoval = true, cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private List<MaterialPriceEntity> prices = new ArrayList<>();

    @OneToMany(mappedBy = "materialEntity", targetEntity = ModelEntity.class)
    private List<ModelEntity> modelEntities;

    protected MaterialEntity() {}

    public MaterialEntity(String name, int price) {
        this.name = name;
        this.prices.add(new MaterialPriceEntity(this, price));
    }


    public List<ModelEntity> getModelEntities() {
        return modelEntities;
    }

    public void setModelEntities(List<ModelEntity> modelEntities) {
        this.modelEntities = modelEntities;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public List<MaterialPriceEntity> getPrices() {
        return prices;
    }

    public void setPrices(List<MaterialPriceEntity> prices) {
        this.prices = prices;
    }

    @JsonIgnore
    public List<MaterialPriceEntity> getPriceEntities() {
        return prices;
    }

    public void addPriceEntity(MaterialPriceEntity materialPrice) {
        prices.add(materialPrice);
    }

    @Transient
    @JsonGetter
    public Integer getLastPrice() {
        return !prices.isEmpty()
                ? prices.get(prices.size() - 1).getPrice()
                : -1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MaterialEntity that = (MaterialEntity) o;

        if (id != that.id) return false;
        if (deleted != that.deleted) return false;
        return name != null ? name.equals(that.name) : that.name == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (deleted ? 1 : 0);
        return result;
    }
}
