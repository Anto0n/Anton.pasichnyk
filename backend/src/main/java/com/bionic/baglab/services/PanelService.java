package com.bionic.baglab.services;

import com.bionic.baglab.dao.PanelDao;
import com.bionic.baglab.domains.PanelEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Potaychuk Sviatoslav on 14.06.2017.
 */
@Service
public class PanelService {

    private final PanelDao panelDao;

    @Autowired
    public PanelService(PanelDao panelDao) {
        this.panelDao = panelDao;
    }

    public Set<PanelEntity> getAll(){
        return panelDao.findAll();
    }
}
