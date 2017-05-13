package com.bionic.baglab.services;

import com.bionic.baglab.dao.BagTypeDao;
import com.bionic.baglab.dao.BagTypePriceDao;
import com.bionic.baglab.domains.BagTypeEntity;
import com.bionic.baglab.domains.BagTypePriceEntity;
import com.bionic.baglab.dto.BagTypeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BagTypeService {
    @Autowired
    private BagTypeDao bagTypeDao;

    @Autowired
    private BagTypePriceDao bagTypePriceDao;

    public BagTypeEntity findOne(long id) {
        return bagTypeDao.findOne(id);
    }

    public BagTypeDto getDtoById(long id){
        BagTypeEntity bagTypeEntity = findOne(id);
        return new BagTypeDto(bagTypeEntity.getName(), bagTypeEntity.getScript(), bagTypeEntity.getLastPrice());
    }

    public List<BagTypeEntity> findExistent() {
        return bagTypeDao.findExistent();
    }

    public void deleteBag(long id) {
        BagTypeEntity bagType = bagTypeDao.findOne(id);
        bagType.setDeleted(true);
        save(bagType);
    }

    public void save(BagTypeEntity bagTypeEntity) {
        bagTypeDao.save(bagTypeEntity);
    }

    /**
     *
     * @param bagType object of BagType that needs to be modified
     * @param newPrice new price value for BagType object
     * @return new BagTypeDto that reflects modified object
     */
    public BagTypeDto saveNewPrice(BagTypeEntity bagType, int newPrice) {
        BagTypePriceEntity bagTypePrice = new BagTypePriceEntity(bagType, newPrice);
        bagType.getPriceEntities().add(bagTypePrice);
        bagTypePriceDao.save(bagTypePrice);
        return new BagTypeDto(bagType.getName(),bagType.getScript(), bagTypePrice.getPrice());
    }

    public BagTypeEntity addBagType(String name, String script, Integer price) {
        BagTypeEntity bagTypeEntity = new BagTypeEntity(name, script, price);
        return bagTypeEntity;
    }

    public BagTypeDto getDtoFromBagType(BagTypeEntity bagTypeEntity){
        return new BagTypeDto(bagTypeEntity.getName(), bagTypeEntity.getScript(), bagTypeEntity.getLastPrice());
    }

    public List<BagTypeDto> getListDto(List<BagTypeEntity> bagTypeEntityList) {
        List<BagTypeDto> dtoList = new ArrayList<>();
        for (BagTypeEntity bagTypeEntity : bagTypeEntityList) {
            dtoList.add(new BagTypeDto(bagTypeEntity.getName(), bagTypeEntity.getScript(), bagTypeEntity.getLastPrice()));
        }
        return dtoList;
    }
}
