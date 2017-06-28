package com.bionic.baglab.dao;

import com.bionic.baglab.domains.PanelEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * Created by Potaychuk Sviatoslav on 14.06.2017.
 */
@Repository
public interface PanelDao  extends CrudRepository<PanelEntity, Long> {

    Set<PanelEntity> findAll();

    PanelEntity findByName(String name);
}
