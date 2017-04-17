package com.bionic.baglab.dao;

import com.bionic.baglab.domains.MaterialPriceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RepositoryRestResource(collectionResourceRel = "material_price", path = "material_price")
public interface MaterialPriceDao extends CrudRepository<MaterialPriceEntity, Long> {

}
