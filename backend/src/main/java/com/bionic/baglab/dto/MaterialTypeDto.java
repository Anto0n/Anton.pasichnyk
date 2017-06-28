package com.bionic.baglab.dto;

import com.bionic.baglab.domains.MaterialTypeEntity;
import com.bionic.baglab.dto.model.ModelDto;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by frontend on 6/28/17.
 */
public class MaterialTypeDto {

    private String name;
    private List<MaterialDto> materials;

    public MaterialTypeDto() {
    }


    public MaterialTypeDto(MaterialTypeEntity materialTypeEntity) {
        this.name = materialTypeEntity.getName();
        this.materials = materialTypeEntity.getMaterialEntities().stream().map(MaterialDto::new).collect(Collectors.toList());
    }
    public MaterialTypeDto(String name, List<MaterialDto> materials) {
        this.name = name;
        this.materials = materials;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MaterialDto> getMaterials() {
        return materials;
    }

    public void setMaterials(List<MaterialDto> materials) {
        this.materials = materials;
    }
}
