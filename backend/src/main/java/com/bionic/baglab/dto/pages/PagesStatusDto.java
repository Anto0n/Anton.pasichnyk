package com.bionic.baglab.dto.pages;

import com.bionic.baglab.dto.enums.PagesStatusNameEnum;

import javax.validation.constraints.NotNull;

public class PagesStatusDto {
    @NotNull(message = "error.id.notnull")
    private long idnews;
    @NotNull(message = "error.type_status.notnull")
    private PagesStatusNameEnum type;

    public PagesStatusDto(long idnews, PagesStatusNameEnum type) {
        this.idnews = idnews;
        this.type = type;
    }

    public PagesStatusDto() {
    }

    public long getIdnews() {
        return idnews;
    }

    public void setIdnews(long idnews) {
        this.idnews = idnews;
    }

    public PagesStatusNameEnum getType() {
        return type;
    }

    public void setType(PagesStatusNameEnum type) {
        this.type = type;
    }
}
