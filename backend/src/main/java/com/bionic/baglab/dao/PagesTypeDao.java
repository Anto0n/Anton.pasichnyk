package com.bionic.baglab.dao;


import com.bionic.baglab.domains.PagesTypeEntity;
import org.springframework.data.repository.CrudRepository;

public interface PagesTypeDao  extends CrudRepository<PagesTypeEntity, Long> {
    public  PagesTypeEntity findDistinctByType(String type);
}


