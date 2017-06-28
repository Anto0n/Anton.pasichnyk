package com.bionic.baglab.domains;

import javax.persistence.*;
import java.util.List;

/**
 * Created by frontend on 6/28/17.
 */
@Entity
@Table(name = "material_type", schema = "baglab")
public class MaterialTypeEntity {

    @Id
    @GeneratedValue
    @Column(name = "[idMaterialType]")
    private long idMaterialType;

    @Column(name = "[name]")
    private String name;

    @OneToMany(mappedBy = "materialTypeEntity", targetEntity = MaterialEntity.class)
    private List<MaterialEntity> materialEntities;


    public List<MaterialEntity> getMaterialEntities() {
        return materialEntities;
    }

    public void setMaterialEntities(List<MaterialEntity> materialEntities) {
        this.materialEntities = materialEntities;
    }

    public long getIdMaterialType() {
        return idMaterialType;
    }

    public void setIdMaterialType(long idMaterialType) {
        this.idMaterialType = idMaterialType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MaterialTypeEntity that = (MaterialTypeEntity) o;

        return idMaterialType == that.idMaterialType && (name != null ? name.equals(that.name) : that.name == null);
    }

    @Override
    public int hashCode() {
        int result = (int) (idMaterialType ^ (idMaterialType >>> 32));
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
