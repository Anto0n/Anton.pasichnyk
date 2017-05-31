package com.bionic.baglab.dto;

/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 */
public class ImageDto {
    private String image;

    public ImageDto() {
    }

    public ImageDto(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
