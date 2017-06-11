package com.bionic.baglab.dto.model;

import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.enums.ModelStatusEnum;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public class ModelDto {
    private long id;
    @NotNull(message = "error.uid.notnull")
    private long userId;
    @NotNull(message = "error.bagTypeId.notnull")
    private long bagTypeId;
    @NotNull(message = "error.bagTypeId.notnull")
    private long materialId;
    @NotNull(message = "error.bagmname.notnull")
    private String mname;
    @NotNull(message = "error.modelStatus.notnull")
    private ModelStatusEnum approved;
    private Timestamp modelCreate;
    private Timestamp modelUpdate;
    //private String config;

    public ModelDto() {
    }


    public ModelDto(ModelEntity modelEntity) {
        this.id = modelEntity.getIdModel();
        this.userId = modelEntity.getUserEntity().getIdUser();
        this.bagTypeId = modelEntity.getBagTypeEntity().getId();
        this.materialId = modelEntity.getMaterialEntity().getId();
        this.modelCreate =  modelEntity.getModelCreate();
        this.modelUpdate =  modelEntity.getModelCreate();
        this.approved = modelEntity.getApproved();
        this.mname = modelEntity.getMname();
        //this.config = modelEntity.getConfig();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBagTypeId() {
        return bagTypeId;
    }

    public void setBagTypeId(long bagTypeId) {
        this.bagTypeId = bagTypeId;
    }

    public Timestamp getModelCreate() {
        return modelCreate;
    }

    public void setModelCreate(Timestamp modelCreate) {
        this.modelCreate = modelCreate;
    }

    public Timestamp getModelUpdate() {
        return modelUpdate;
    }

    public void setModelUpdate(Timestamp modelUpdate) {
        this.modelUpdate = modelUpdate;
    }

    public String getMname() {
        return mname;
    }

    public ModelStatusEnum getApproved() {
        return approved;
    }

    public void setApproved(ModelStatusEnum approved) {
        this.approved = approved;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(long materialId) {
        this.materialId = materialId;
    }

   /* public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }*/
}
