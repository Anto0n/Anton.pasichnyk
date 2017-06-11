package com.bionic.baglab.dto;

import com.bionic.baglab.domains.MaterialEntity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

@ApiModel
public class MaterialDto {
    private long id;
    private final String name;
    private final int price;
    private String image;

    @JsonCreator
    public MaterialDto(@JsonProperty("id") long id, @JsonProperty("name") String name, @JsonProperty("price") int price, @JsonProperty("image") String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    public MaterialDto(MaterialEntity materialEntity){
        this.id=materialEntity.getId();
        this.name=materialEntity.getName();
        this.price=materialEntity.getLastPrice();
        this.image=materialEntity.getImage();
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public long getId() {return id; }

    public String getImage() {
        return image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MaterialDto that = (MaterialDto) o;

        if (price != that.price) return false;
        return name != null ? name.equals(that.name) : that.name == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + price;
        return result;
    }

    @Override
    public String toString() {
        return "MaterialDto{" +
                "id='" + id + '\'' +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
