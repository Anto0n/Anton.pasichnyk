package com.bionic.baglab.services;


import com.bionic.baglab.dao.PagesDao;
import com.bionic.baglab.dao.PagesTypeDao;
import com.bionic.baglab.domains.PagesEntity;
import com.bionic.baglab.domains.PagesTypeEntity;
import com.bionic.baglab.dto.enums.PagesStatusEnum;
import com.bionic.baglab.dto.pages.CreatePagesDto;
import com.bionic.baglab.dto.pages.PagesDto;
import com.bionic.baglab.dto.pages.PagesStatusDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //admin only
    public Set<PagesDto> getAllNews() {
        List<PagesEntity> pagesEntities = pagesDao.findAll();
        return pagesEntities.stream().map(PagesDto::new).collect(Collectors.toSet());
    }


    public Set<PagesDto> getAllNewsByStatus(PagesStatusEnum status) {
        List<PagesEntity> pagesEntities = pagesDao.findAllByPagesTypeType(status.name());
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

    public boolean changeStatus(PagesStatusDto pagesStatusDto){
        try{
            PagesEntity ent = pagesDao.findOne(pagesStatusDto.getIdnews());
            PagesTypeEntity type = pagesTypeDao.findDistinctByType(pagesStatusDto.getType().name());
            ent.setPagesType(type);
            pagesDao.save(ent);
            return true;
        }catch (Exception ex){
            return false;
        }
    }

      public boolean updateNews(PagesDto pagesDto){
          PagesEntity ent = pagesDao.findOne(pagesDto.getIdnews());
          ent.setBody(pagesDto.getBody());
          ent.setHeader(pagesDto.getHeader());
        try{
            pagesDao.save(ent);
            return true;
        }catch (Exception ex){
            return false;
        }
    }


}
