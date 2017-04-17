package com.bionic.baglab.dao;

import com.bionic.baglab.domains.BagTypeEntity;
import com.bionic.baglab.domains.BagTypePriceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.transaction.Transactional;

@Transactional
@RepositoryRestResource(collectionResourceRel = "bag_type_price", path = "bag_type_price")
public interface BagTypePriceDao extends CrudRepository<BagTypePriceEntity, Long> {

}
