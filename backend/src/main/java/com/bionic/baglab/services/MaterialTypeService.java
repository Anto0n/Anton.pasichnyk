package com.bionic.baglab.services;

import com.bionic.baglab.dao.MaterialTypeDao;
import com.bionic.baglab.domains.MaterialTypeEntity;
import com.bionic.baglab.dto.MaterialTypeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by frontend on 6/28/17.
 */
@Service
public class MaterialTypeService {

    final
    MaterialTypeDao materialTypeDao;

    @Autowired
    public MaterialTypeService(MaterialTypeDao materialTypeDao) {
        this.materialTypeDao = materialTypeDao;
    }

    public Set<MaterialTypeDto> getAllTypes(){
        Set<MaterialTypeDto> set = ((List<MaterialTypeEntity>) materialTypeDao.findAll()).stream().map(MaterialTypeDto::new).collect(Collectors.toSet());
        return ((List<MaterialTypeEntity>) materialTypeDao.findAll()).stream().map(MaterialTypeDto::new).collect(Collectors.toSet());
    }
}
