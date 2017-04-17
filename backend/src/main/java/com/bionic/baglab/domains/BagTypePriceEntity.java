package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bag_type_price", schema = "baglab")
public class BagTypePriceEntity {
    @Id
    @GeneratedValue
    @Column(name = "idbag_type_price")
    private long idbagTypePrice;

    @ManyToOne
    @JoinColumn(name = "bag_type_id", nullable = false)
    private BagTypeEntity bagType;

    @Basic
    @Column(name = "date")
    private Timestamp date;

    @Basic
    @Column(name = "price")
    private Integer price;

    public BagTypePriceEntity(BagTypeEntity bagTypeEntity, int price) {
        this.price = price;
        this.bagType = bagTypeEntity;
    }

    public BagTypePriceEntity() {
    }

    public long getIdbagTypePrice() {
        return idbagTypePrice;
    }

    public BagTypeEntity getBagType() {
        return bagType;
    }

    public Timestamp getDate() {
        return date;
    }

    public Integer getPrice() {
        return price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BagTypePriceEntity that = (BagTypePriceEntity) o;

        if (idbagTypePrice != that.idbagTypePrice) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (idbagTypePrice ^ (idbagTypePrice >>> 32));
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }
}
