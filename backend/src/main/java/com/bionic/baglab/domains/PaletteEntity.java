package com.bionic.baglab.domains;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Potaychuk Sviatoslav on 27.05.2017.
 */
@Entity
@Table(name = "[palette]", schema = "baglab")
public class PaletteEntity {

    private long id;
    private String rgb;
    @Id
    @Column(name = "idColor",  columnDefinition = "INT(11)")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "rgb")
    public String getRgb() {
        return rgb;
    }

    public void setRgb(String rgb) {
        this.rgb = rgb;
    }
}
