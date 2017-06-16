package com.bionic.baglab.domains;

import org.springframework.stereotype.Component;

import javax.persistence.*;

/**
 * Created by Potaychuk Sviatoslav on 14.06.2017.
 */
@Entity
@Table(name = "panel")
public class PanelEntity {
    private long id;
    private String name;
    private String texture;

    @Id
    @GeneratedValue
    @Column(name = "idPanel")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "texture")
    public String getTexture() {
        return texture;
    }

    public void setTexture(String texture) {
        this.texture = texture;
    }
}
