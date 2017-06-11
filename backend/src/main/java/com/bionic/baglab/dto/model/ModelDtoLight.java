package com.bionic.baglab.dto.model;

import com.bionic.baglab.domains.ModelEntity;

/**
 * Created by Potaychuk Sviatoslav on 10.06.2017.
 */
public class ModelDtoLight {

    private long id;

    private String mname;

    public ModelDtoLight(ModelEntity modelEntity) {
        this.id=modelEntity.getIdModel();
        this.mname=modelEntity.getMname();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }
}
