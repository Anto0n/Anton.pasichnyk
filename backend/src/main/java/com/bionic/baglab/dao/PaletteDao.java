package com.bionic.baglab.dao;

import com.bionic.baglab.domains.PaletteEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Potaychuk Sviatoslav on 27.05.2017.
 */
public interface PaletteDao extends CrudRepository<PaletteEntity, Long> {
    List<PaletteEntity> findAll();
    PaletteEntity save(PaletteEntity paletteEntity);
}
