package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.BagTypeEntity;
import com.bionic.baglab.dto.BagTypeDto;
import com.bionic.baglab.services.BagTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api/bag_type")
public class BagTypeController {
    @Autowired
    private BagTypeService bagTypeService;

    /**
     * @return List of bag types
     */
    @GetMapping(value = "/list")
    public ResponseEntity<List<BagTypeDto>> listBagTypes() {
        List<BagTypeEntity> bagTypeEntityList = bagTypeService.findExistent();
        return new ResponseEntity<>(bagTypeService.getListDto(bagTypeEntityList), HttpStatus.OK);
    }

    /**
     * Add new bag type
     * @return DTO of created bag type object
     */
    @PostMapping(value = "/add")
    public BagTypeDto addBagType(@RequestBody BagTypeDto bagTypeDto) {
        BagTypeEntity bagTypeEntity = bagTypeService.addBagType(bagTypeDto.getName(), bagTypeDto.getScript(),
                bagTypeDto.getPrice());
        bagTypeService.save(bagTypeEntity);
        return bagTypeService.getDtoFromBagType(bagTypeEntity);
    }

    /**
     * Change price of a bag type
     * @return selected bag type DTO with new price
     */
    @PostMapping(value = "/{id}/change_price")
    @Transactional
    public BagTypeDto changePrice(@PathVariable("id") long id,
                                      @RequestParam("newPrice") int newPrice) {
       return bagTypeService.saveNewPrice(bagTypeService.findOne(id), newPrice);
    }

    /**
     *
     * @param id of the bag type that we are looking for
     * @return bagTypeDto object
     */
    @PostMapping(value = "/{id}")
    public BagTypeDto findById(@PathVariable("id") long id) {
        BagTypeDto bagType = bagTypeService.getDtoById(id);
        return bagType;
    }

    @GetMapping(value = "/getJson/{id}", produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<String> findByIdJsonBody(@PathVariable("id") long id) {
        BagTypeEntity bagType = bagTypeService.findOne(id); //if error - return HttpStatus.NOT_FOUND
        String script = bagType.getScript();
        return new ResponseEntity<>(script, HttpStatus.OK);
    }

    /**
     *
     * @param id of the bag type that needs to be deleted
     * @return bag type object with field deleted marked as "true"
     */
    @PostMapping(value = "/delete/{id}")
    public ResponseEntity deleteMaterial(@PathVariable("id") long id) {
        bagTypeService.deleteBag(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

