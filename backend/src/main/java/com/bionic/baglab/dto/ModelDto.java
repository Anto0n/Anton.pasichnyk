package com.bionic.baglab.dto;

import com.bionic.baglab.domains.ModelEntity;

import java.sql.Timestamp;

/**
 * Created by potaychuk on 29.03.2017.
 */
public class ModelDto {
    private long id;
    private Timestamp modelCreate;
    private Timestamp modelUpdate;

    public ModelDto() {
    }

    public ModelDto(ModelEntity modelEntity) {
       this.id = modelEntity.getIdModel();
       this.modelCreate =  modelEntity.getModelCreate();
       this.modelUpdate =  modelEntity.getModelCreate();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
