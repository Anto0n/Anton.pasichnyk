package com.bionic.baglab.dao;

import com.bionic.baglab.domains.ModelEntity;
import com.bionic.baglab.dto.enums.ModelStatusEnum;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
//@RepositoryRestResource(collectionResourceRel = "models", path = "models")
public interface ModelDao extends CrudRepository<ModelEntity, Long> {


    @Query("select model from ModelEntity model where model.userEntity.idUser = :id")
    List<ModelEntity> findAllModelsbyUserId (@Param("id") long userId);


        public List<ModelEntity> findAllModelsByApproved (ModelStatusEnum approved);
        ModelEntity findOne(Long id);


}
