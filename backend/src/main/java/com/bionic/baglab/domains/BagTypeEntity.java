package com.bionic.baglab.domains;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;

@Entity
@Table(name = "bag_type", schema = "baglab")
public class BagTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "[idBagType]")
    private long id;

    @Basic
    @Column(name = "[script]", columnDefinition = "MEDIUMTEXT")
    private String script;

    @Column(name = "[name]")
    private String name;

    @Column(name = "[deleted]", columnDefinition = "bit(1)")
    private boolean deleted = false;

    @OneToMany(mappedBy = "bagType", targetEntity = BagTypePriceEntity.class, orphanRemoval = true, cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private List<BagTypePriceEntity> prices =new ArrayList<>();

    @OneToMany(mappedBy = "bagTypeEntity", targetEntity = ModelEntity.class )
    private List<ModelEntity> modelEntities;

    @OneToMany(mappedBy = "bagTypeEntity", targetEntity = PanelEntity.class )
    private List<PanelEntity> panels;

    protected BagTypeEntity() {}

    public BagTypeEntity(String name, String script, int price) {
        this.name = name;
        this.script = script;
        this.prices.add(new BagTypePriceEntity(this, price));
    }

    public List<PanelEntity> getPanels() {
        return panels;
    }

    public void setPanels(List<PanelEntity> panels) {
        this.panels = panels;
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

    public String getScript() {
        return script;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @JsonIgnore
    public List<BagTypePriceEntity> getPriceEntities() {
        return prices;
    }

    public void addPriceEntity(BagTypePriceEntity bagTypePrice) {
        prices.add(bagTypePrice);
    }

    @Transient
    @JsonGetter
    public Integer getLastPrice() {
        if (prices.isEmpty()) {
            throw new IllegalStateException("Can't find last price for bag type " + id + ". Prices is empty.");
        }
        return prices.get(prices.size() - 1).getPrice();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BagTypeEntity that = (BagTypeEntity) o;

        if (id != that.id) return false;
        if (prices != that.prices) return false;
        if (script != null ? !script.equals(that.script) : that.script != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (script != null ? script.hashCode() : 0);
        result = 31 * result + prices.hashCode();
        return result;
    }
}
