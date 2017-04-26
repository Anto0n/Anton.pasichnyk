package com.bionic.baglab.services;

import com.bionic.baglab.dao.BagTypeDao;
import com.bionic.baglab.domains.BagTypeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Potaychuk Sviatoslav on 26.04.2017.
 */
@Service
public class BagTypeService {
    @Autowired
    BagTypeDao bagTypeDao;

    public BagTypeEntity findOne(long id){
        return bagTypeDao.findOne(id);
    }

}
