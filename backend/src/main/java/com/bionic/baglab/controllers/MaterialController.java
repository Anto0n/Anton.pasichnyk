package com.bionic.baglab.controllers;

import com.bionic.baglab.dao.MaterialDao;
import com.bionic.baglab.dao.MaterialPriceDao;
import com.bionic.baglab.domains.MaterialEntity;
import com.bionic.baglab.domains.MaterialPriceEntity;
import com.bionic.baglab.dto.MaterialDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("material")
public class MaterialController {

    @Autowired
    private MaterialDao materialDao;

    @Autowired
    private MaterialPriceDao materialPriceDao;

    /**
     * @return List of materials
     */
    @GetMapping(value = "/list")
    public List<MaterialEntity> listBagTypes() {
        return materialDao.findExistent();
    }

    @PostMapping(value = "/{id}/change_price")
    @Transactional
    public MaterialEntity changePrice(@PathVariable("id") long id,
                                      @RequestParam("newPrice") int newPrice) {

        MaterialEntity material = materialDao.findOne(id);
        MaterialPriceEntity materialPrice = new MaterialPriceEntity(material, newPrice);
        material.getPriceEntities().add(materialPrice);
        materialPriceDao.save(materialPrice);

        return material;
    }

    @PostMapping(value = "/add")
    public MaterialEntity addMaterial(@RequestBody MaterialDto materialDto) {
        MaterialEntity material = new MaterialEntity(materialDto.getName(), materialDto.getPrice());
        materialDao.save(material);
        return material;
    }

    @PostMapping(value = "/{id}")
    public MaterialEntity findById(@PathVariable("id") long id) {
        MaterialEntity material = materialDao.findOne(id);
        return material;
    }

    @PostMapping(value = "/delete/{id}")
    public MaterialEntity deleteMaterial(@PathVariable("id") long id) {
        MaterialEntity material = materialDao.findOne(id);
        material.setDeleted(true);
        materialDao.save(material);
        return material;
    }
}
