package com.bionic.baglab.services;


import com.bionic.baglab.dao.PagesDao;
import com.bionic.baglab.domains.PagesEntity;
import com.bionic.baglab.dto.PagesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PagesService{
    @Autowired
    PagesDao pagesDao;

    public Set<PagesDto> getAllNews(){
        List<PagesEntity> pagesEntities = pagesDao.findAll();
        return pagesEntities.stream().map(PagesDto::new).collect(Collectors.toSet());
    }


}
