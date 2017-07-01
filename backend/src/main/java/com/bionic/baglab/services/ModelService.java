package com.bionic.baglab.services;

import com.bionic.baglab.dao.BagTypeDao;
import com.bionic.baglab.dao.MaterialDao;
import com.bionic.baglab.dao.ModelDao;
import com.bionic.baglab.dao.UserDao;
import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.model.ModelDto;
import com.bionic.baglab.dto.model.ModelDtoCreate;
import com.bionic.baglab.dto.enums.ModelStatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Anton on 03-Apr-17.
 */
@Service
public class ModelService {
    private final ModelDao modelDao;

    private final UserDao userDao;

    private final BagTypeDao bagTypeDao;

    private final MaterialDao materialDao;

    @Autowired
    public ModelService(ModelDao modelDao, UserDao userDao, BagTypeDao bagTypeDao, MaterialDao materialDao) {
        this.modelDao = modelDao;
        this.userDao = userDao;
        this.bagTypeDao = bagTypeDao;
        this.materialDao = materialDao;
    }

    public ModelEntity findOne(long id) {
        return modelDao.findOne(id);
    }

    public void delete(ModelEntity modelEntity) {
        modelDao.delete(modelEntity);
    }
    public ModelDto findOneDto(long id) {
        return new ModelDto(modelDao.findOne(id));
    }

    public String findOneConfig(long id) {
       ModelEntity model=modelDao.findOne(id);
        return model.getConfig();
    }

    public List<ModelDto> findAllModelsbyUserId(long id) {
        List<ModelDto> modelList;
        modelList = getDtosfromEntitys(modelDao.findAllModelsbyUserId(id));
        return modelList;
    }

    public void save(ModelEntity model) {
        modelDao.save(model);
    }




    public void setModelApproved(long modelId, ModelStatusEnum approved) {
        ModelEntity model = modelDao.findOne(modelId);
        model.setApproved(approved);
        modelDao.save(model);
    }

    public List<ModelDto> findAllModels() {
        return this.getDtosfromEntitys((List<ModelEntity>) modelDao.findAll());
    }

    /**
     * transform Enteties list to DTO list
     * @param modelsEntities
     * @return List<ModelDto>
     */
    private List<ModelDto> getDtosfromEntitys(List<ModelEntity> modelsEntities){
        return modelsEntities.stream()        //make list of userDto from modelEntity list
                .map(ModelDto::new)
                .collect(Collectors.toList());
    }

    public boolean createModel(ModelDtoCreate modelDtoCreate) {
        ModelEntity model = new ModelEntity();
        model.setUserEntity(userDao.findOne(modelDtoCreate.getUserId()));
        model.setBagTypeEntity(bagTypeDao.findOne(modelDtoCreate.getBagTypeId()));
        model.setMaterialEntity(materialDao.findOne(modelDtoCreate.getMaterialId()));
        model.setMname(modelDtoCreate.getMname());
        model.setApproved(modelDtoCreate.getApproved());
        model.setConfig(modelDtoCreate.getConfig());
        model.setImageConfig(modelDtoCreate.getImageConfig());
        try{
            modelDao.save(model);
        }catch(Exception ex){
            return false;
        }
        return true;

    }

    public List<ModelDto> findAllModelsParam(ModelStatusEnum approved) {
        return this.getDtosfromEntitys((List<ModelEntity>) modelDao.findAllModelsByApproved(approved));
    }

    public List<ModelDto> findDefault() {
        return modelDao.findAllModelsByApproved(ModelStatusEnum.DEFAULT).stream().map(ModelDto::new).collect(Collectors.toList());
    }
}


