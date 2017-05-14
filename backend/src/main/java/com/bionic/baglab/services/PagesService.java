package com.bionic.baglab.services;


import com.bionic.baglab.dao.PagesDao;
import com.bionic.baglab.dao.PagesTypeDao;
import com.bionic.baglab.domains.PagesEntity;
import com.bionic.baglab.domains.PagesTypeEntity;
import com.bionic.baglab.dto.CreatePagesDto;
import com.bionic.baglab.dto.PagesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PagesService {
    private final String PAGES_TYPE_NEW = "ACTIVE";
    private final String PAGES_TYPE_ARCHIVE = "ARCHIVE";
    private final String PAGES_TYPE_DEL = "DELETED";
    @Autowired
    PagesDao pagesDao;

    @Autowired
    PagesTypeDao pagesTypeDao;

    public Set<PagesDto> getAllNews() {
        List<PagesEntity> pagesEntities = pagesDao.findAll();
        return pagesEntities.stream().map(PagesDto::new).collect(Collectors.toSet());
    }

    public boolean createNews(CreatePagesDto dto) {
        PagesEntity entity = new PagesEntity();
        try {
            entity.setBody(dto.getBody());
            entity.setHeader(dto.getHeader());
            PagesTypeEntity pt = pagesTypeDao.findDistinctByType(PAGES_TYPE_NEW);
            entity.setPagesType(pt);
            pagesDao.save(entity);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteNews(Long newsId){
        try{
            pagesDao.delete(newsId);
            return true;
        }catch (Exception ex){
            return false;
        }
    }

 /*   public boolean updateNews(Long newsId){
        try{

            return true;
        }catch (Exception ex){
            return false;
        }
    }*/


}
