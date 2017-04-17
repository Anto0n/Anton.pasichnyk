package com.bionic.baglab.dao;

import com.bionic.baglab.domains.MaterialEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RepositoryRestResource(collectionResourceRel = "material", path = "material")
public interface MaterialDao extends CrudRepository<MaterialEntity, Long> {
    @Query("select m from MaterialEntity m where m.deleted = false")
    List<MaterialEntity> findExistent();
}