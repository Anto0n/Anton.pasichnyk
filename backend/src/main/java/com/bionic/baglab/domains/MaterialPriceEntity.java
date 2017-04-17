package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "material_price", schema = "baglab")
public class MaterialPriceEntity {

    @Id
    @GeneratedValue
    @Column(name = "idmaterial_price")
    private long id;

    @Column(name = "price")
    private int price;

    @ManyToOne
    @JoinColumn(name = "materialId", nullable = false)
    private MaterialEntity material;

    @Column(name = "date")
    private Timestamp date = Timestamp.valueOf(LocalDateTime.now());

    public MaterialPriceEntity(MaterialEntity material, int price) {
        this.material = material;
        this.price = price;
    }

    protected MaterialPriceEntity() {
    }

    public long getId() {
        return id;
    }

    public MaterialEntity getMaterial() {
        return material;
    }

    public int getPrice() {
        return price;
    }

    public Timestamp getDate() {
        return date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MaterialPriceEntity that = (MaterialPriceEntity) o;

        if (id != that.id) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }
}
