package com.bionic.baglab.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

@ApiModel
public class MaterialDto {

    private final String name;
    private final int price;

    @JsonCreator
    public MaterialDto(@JsonProperty("name") String name, @JsonProperty("price") int price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
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
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
