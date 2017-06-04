package com.bionic.baglab.controllers;

import com.bionic.baglab.domains.MaterialEntity;
import com.bionic.baglab.domains.PaletteEntity;
import com.bionic.baglab.dto.MaterialDto;
import com.bionic.baglab.services.MaterialService;
import com.bionic.baglab.services.PaletteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    private final MaterialService materialService;

    private final PaletteService paletteService;

    @Autowired
    public MaterialController(PaletteService paletteService, MaterialService materialService) {
        this.paletteService = paletteService;
        this.materialService = materialService;
    }

    /**
     * @return List of materials
     */
    @GetMapping(value = "/list")
    public List<MaterialDto> listBagTypes() {
        return materialService.findExistentAsDto();
    }

    @PostMapping(value = "/{id}/change_price")
    @Transactional
    public MaterialDto changePrice(@PathVariable("id") long id,
                                      @RequestParam("newPrice") int newPrice) {
        return materialService.changeMaterialPrice(id, newPrice);
    }

    @PostMapping(value = "/add")
    public MaterialDto addMaterial(@RequestBody MaterialDto materialDto) {
        MaterialEntity material = new MaterialEntity(materialDto.getName(), materialDto.getPrice());
        materialService.saveMaterial(material);
        return materialService.getDtoMaterial(material);
    }

    @PostMapping(value = "/{id}")
    public MaterialDto findById(@PathVariable("id") long id) {
        MaterialEntity material = materialService.findOne(id);
        return materialService.getDtoMaterial(material);
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity deleteMaterial(@PathVariable("id") long id) {
        materialService.deleteMaterial(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/palette")
    public List<PaletteEntity> getPalette() {
        return paletteService.findAll();
    }
}
