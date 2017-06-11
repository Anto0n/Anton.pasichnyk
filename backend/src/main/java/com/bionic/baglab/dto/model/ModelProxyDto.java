package com.bionic.baglab.dto.model;

import java.util.List;

/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 */
public class ModelProxyDto {
    private String image;
    private List<String> rgb;


    public ModelProxyDto() {
    }

    public ModelProxyDto(String image, List<String> rgb) {
        this.image = image;
        this.rgb = rgb;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getRgb() {
        return rgb;
    }

    public void setRgb(List<String> rgb) {
        this.rgb = rgb;
    }
}
