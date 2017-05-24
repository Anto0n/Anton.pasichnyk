package com.bionic.baglab.dto.pages;

import com.bionic.baglab.dto.enums.PagesStatusEnum;

import javax.validation.constraints.NotNull;

public class PagesStatusDto {
    @NotNull(message = "error.id.notnull")
    private long idnews;
    @NotNull(message = "error.type_status.notnull")
    private PagesStatusEnum type;

    public PagesStatusDto(long idnews, PagesStatusEnum type) {
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

    public PagesStatusEnum getType() {
        return type;
    }

    public void setType(PagesStatusEnum type) {
        this.type = type;
    }
}
