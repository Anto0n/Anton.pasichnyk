package com.bionic.baglab.dto;

import com.bionic.baglab.domains.PanelEntity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;

import java.util.List;

@ApiModel
public class BagTypeDto {
    private long id;
    private String name;
    private String script;
    private Integer price;
    private List<PanelEntity> panels;

    @JsonCreator
    public BagTypeDto(@JsonProperty("id") long id,
                      @JsonProperty("name") String name,
                      @JsonProperty("script") String script,
                      @JsonProperty("price") int price,
                      @JsonProperty("panels") List<PanelEntity> panels) {
        this.id = id;
        this.name = name;
        this.script = script;
        this.price = price;
        this.panels =panels;
    }

    public long getId() {  return id;  }

    public List<PanelEntity> getPanels() {
        return panels;
    }

    public void setPanels(List<PanelEntity> panels) {
        this.panels = panels;
    }

    public String getScript() {
        return script;
    }

    public Integer getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BagTypeDto that = (BagTypeDto) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (script != null ? !script.equals(that.script) : that.script != null) return false;
        return price != null ? price.equals(that.price) : that.price == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (script != null ? script.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "BagTypeDto{" +
                "id='" + id + '\'' +
                "name='" + name + '\'' +
                ", script='" + script + '\'' +
                ", price=" + price +
                '}';
    }
}
