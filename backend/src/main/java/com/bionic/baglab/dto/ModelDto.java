package com.bionic.baglab.dto;

import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.enums.ModelStatus;

import java.sql.Timestamp;

public class ModelDto {
    private long id;
    private long userId;
    private long bagTypeId;
    private String mname;
    private ModelStatus approved;
    private Timestamp modelCreate;
    private Timestamp modelUpdate;

    public ModelDto() {
    }


    public ModelDto(ModelEntity modelEntity) {
        this.id = modelEntity.getIdModel();
        this.userId = modelEntity.getUserId();
        this.bagTypeId = modelEntity.getBagTypeId();
        this.modelCreate =  modelEntity.getModelCreate();
        this.modelUpdate =  modelEntity.getModelCreate();
        this.approved = modelEntity.getApproved();
        this.mname = modelEntity.getMname();
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

    public ModelStatus getApproved() {
        return approved;
    }

    public void setApproved(ModelStatus approved) {
        this.approved = approved;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }






}
