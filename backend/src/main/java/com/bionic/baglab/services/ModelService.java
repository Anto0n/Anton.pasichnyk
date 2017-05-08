package com.bionic.baglab.services;

import com.bionic.baglab.dao.ModelDao;
import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.ModelDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Anton on 03-Apr-17.
 */
@Service
public class ModelService {
    @Autowired
    ModelDao modelDao;

    public ModelEntity findOne(long id) {
        return modelDao.findOne(id);
    }

    public ModelDto findOneDto(long id) {
        return new ModelDto(modelDao.findOne(id));
    }

    public List<ModelDto> findAllModelsbyUserId(long id) {
        List<ModelDto> modelList;
        modelList = getDtosfromEntitys(modelDao.findAllModelsbyUserId(id));
        return modelList;
    }

    public void save(ModelEntity model) {
        modelDao.save(model);
    }

    /**
     * transform Enteties list to DTO list
     * @param modelsEntities
     * @return List<ModelDto>
     */
    private List<ModelDto> getDtosfromEntitys(List<ModelEntity> modelsEntities){
        List<ModelDto> modelsDtos = modelsEntities.stream()        //make list of userDto from modelEntity list
                .map(modelEntitie -> new ModelDto(modelEntitie))
                .collect(Collectors.toList());
        return modelsDtos;
    }


    public void setModelApproved(long modelId, boolean approved) {
        ModelEntity model = modelDao.findOne(modelId);
        model.setApproved(approved);
        modelDao.save(model);
    }
}


