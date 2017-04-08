package com.bionic.baglab.dto;

import com.bionic.baglab.domains.ModelEntity;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Anton on 03-Apr-17.
 */
public class ModelSetDto {
    Set<ModelDto> setModel = new HashSet<>();


    public ModelSetDto() {
    }

    public ModelSetDto(Set<ModelEntity> setModelEnity) {
        for(ModelEntity entity:setModelEnity){
            setModel.add(new ModelDto(entity));
        }
    }

    public Set<ModelDto> getSetModel() {
        return setModel;
    }

    public void setSetModel(Set<ModelDto> setModel) {
        this.setModel = setModel;
    }
}
