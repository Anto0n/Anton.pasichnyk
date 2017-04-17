package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.BagTypeDao;
import com.bionic.baglab.dao.BagTypePriceDao;
import com.bionic.baglab.domains.BagTypeEntity;
import com.bionic.baglab.domains.BagTypePriceEntity;
import com.bionic.baglab.dto.BagTypeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("bag_type")
public class BagTypeController {
    @Autowired
    private BagTypeDao bagTypeDao;
    @Autowired
    private BagTypePriceDao bagTypePriceDao;

    /**
     * @return List of bag types
     */
    @GetMapping(value = "/list")
    public ResponseEntity<List<BagTypeEntity>> listBagTypes() {
        List<BagTypeEntity> bagTypeEntityList = bagTypeDao.findExistent();
        return new ResponseEntity<>(bagTypeEntityList, HttpStatus.OK);
    }

    /**
     * Add new bag type
     * @return created bag type object
     */
    @PostMapping(value = "/add")
    public BagTypeEntity addBagType(@RequestBody BagTypeDto bagTypeDto) {
        BagTypeEntity bagTypeEntity = new BagTypeEntity(bagTypeDto.getName(), bagTypeDto.getScript(),
                bagTypeDto.getPrice());
        bagTypeDao.save(bagTypeEntity);
        return bagTypeEntity;
    }

    /**
     * Change price of a bag type
     * @return selected bag type with new price
     */
    @PostMapping(value = "/{id}/change_price")
    @Transactional
    public BagTypeEntity changePrice(@PathVariable("id") long id,
                                      @RequestParam("newPrice") int newPrice) {
        BagTypeEntity bagType = bagTypeDao.findOne(id);
        BagTypePriceEntity bagTypePrice = new BagTypePriceEntity(bagType, newPrice);
        bagType.getPriceEntities().add(bagTypePrice);
        bagTypePriceDao.save(bagTypePrice);
        return bagType;
    }

    /**
     *
     * @param id of the bag type that we are looking for
     * @return bag type object
     */
    @PostMapping(value = "/{id}")
    public BagTypeEntity findById(@PathVariable("id") long id) {
        BagTypeEntity bagType = bagTypeDao.findOne(id);
        return bagType;
    }

    /**
     *
     * @param id of the bag type that needs to be deleted
     * @return bag type object with field deleted marked as "true"
     */
    @PostMapping(value = "/delete/{id}")
    public BagTypeEntity deleteMaterial(@PathVariable("id") long id) {
        BagTypeEntity bagType = bagTypeDao.findOne(id);
        bagType.setDeleted(true);
        bagTypeDao.save(bagType);
        return bagType;
    }
}

