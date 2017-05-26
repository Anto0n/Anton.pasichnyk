package com.bionic.baglab.domains;


import com.bionic.baglab.dto.enums.ModelStatusEnum;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "[model]", schema = "baglab")
public class ModelEntity {
    private long idModel;
    private long userId;
    private long bagTypeId;
    private long materialId;
    private Timestamp modelCreate;
    private Timestamp modelUpdate;
    private boolean deleted;
    private ModelStatusEnum approved;
    private String mname;

    public ModelEntity(long idModel) {
        this.idModel = idModel;
    }

    public ModelEntity() {
    }

    @Id
    @Column(name = "[idModel]", columnDefinition = "INT(11)")
    public long getIdModel() {
        return idModel;
    }


    public void setIdModel(long idModel) {
        this.idModel = idModel;
    }

    @Basic
    @Column(name = "[userId]")
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "[bagTypeId]")
    public long getBagTypeId() {
        return bagTypeId;
    }

    public void setBagTypeId(long bagTypeId) {
        this.bagTypeId = bagTypeId;
    }

    @Basic
    @Column(name = "[materialId]")
    public long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(long materialId) {
        this.materialId = materialId;
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

    @Basic
    @Column(name = "[deleted]")
    public boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Basic
    @Column(name = "[approved]")
    @Enumerated(EnumType.ORDINAL)
    @NotNull(message = "error.approved.notnull")
    public ModelStatusEnum getApproved() {  return approved; }

    public void setApproved(ModelStatusEnum approved) {  this.approved = approved; }

    @Basic
    @Column(name = "[mname]")
    public String getMname() { return mname; }

    public void setMname(String mname) {  this.mname = mname;    }

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
        return (int) result;
    }
}
