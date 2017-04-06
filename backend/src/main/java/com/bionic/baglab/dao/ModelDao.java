package com.bionic.baglab.dao;

import com.bionic.baglab.domains.ModelEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by nicot on 3/31/2017.
 */
@Transactional
@RepositoryRestResource(collectionResourceRel = "models", path = "models")
public interface ModelDao extends CrudRepository<ModelEntity, Long> {

    @Query("select e from ModelEntity e where e.deleted = false")
    List<ModelEntity> findExistent();

//    @Query("update ModelEntity e set e.priceEntities")
//    void setPrice(@Param("modelId") Long modeId, @Param("price") Long newPrice);
}
