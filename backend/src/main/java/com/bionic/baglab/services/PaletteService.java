package com.bionic.baglab.services;

import com.bionic.baglab.dao.PaletteDao;
import com.bionic.baglab.domains.PaletteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Potaychuk Sviatoslav on 27.05.2017.
 */
@Service
public class PaletteService {

    @Autowired
    PaletteDao paletteDao;

    public List<PaletteEntity> findAll(){
        return paletteDao.findAll();
    }

    public PaletteEntity save(PaletteEntity paletteEntity){
        return paletteDao.save(paletteEntity);
    }
}
