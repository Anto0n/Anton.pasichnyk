package com.bionic.baglab.services;

import com.bionic.baglab.dao.MaterialDao;
import com.bionic.baglab.dao.MaterialPriceDao;
import com.bionic.baglab.domains.MaterialEntity;
import com.bionic.baglab.domains.MaterialPriceEntity;
import com.bionic.baglab.dto.MaterialDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialDao materialDao;

    @Autowired
    private MaterialPriceDao materialPriceDao;


    public List<MaterialEntity> findExistent() {
        return materialDao.findExistent();
    }

    public MaterialEntity findOne(long id) {
        return materialDao.findOne(id);
    }

    public void savePrice(MaterialPriceEntity materialPrice) {
        materialPriceDao.save(materialPrice);
    }


    public void saveMaterial(MaterialEntity material) {
        materialDao.save(material);
    }

    public MaterialDto changeMaterialPrice(long id, int newPrice) {
        MaterialEntity material = findOne(id);
        MaterialPriceEntity materialPrice = new MaterialPriceEntity(material, newPrice);
        material.getPriceEntities().add(materialPrice);
        savePrice(materialPrice);

        return new MaterialDto(material.getName(), material.getLastPrice());
    }


    public List<MaterialDto> findExistentAsDto() {
        List<MaterialDto> existentDto = new ArrayList<>();
        for (MaterialEntity materialEntity : findExistent()) {
            existentDto.add(new MaterialDto(materialEntity.getName(), materialEntity.getLastPrice()));
        }
        return existentDto;
    }

    public MaterialDto getDtoMaterial(MaterialEntity material) {
        return new MaterialDto(material.getName(), material.getLastPrice());
    }

    public void deleteMaterial(long id) {
        MaterialEntity material = materialDao.findOne(id);
        material.setDeleted(true);
        saveMaterial(material);
    }
}
