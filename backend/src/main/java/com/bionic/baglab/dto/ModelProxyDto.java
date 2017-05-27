package com.bionic.baglab.dto;

/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 */
public class ModelProxyDto {
    private String image;
    private String rgb;


    public ModelProxyDto() {
    }

    public ModelProxyDto(String image, String rgb) {
        this.image = image;
        this.rgb = rgb;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRgb() {
        return rgb;
    }

    public void setRgb(String rgb) {
        this.rgb = rgb;
    }
}
