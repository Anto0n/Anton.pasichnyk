package com.bionic.baglab.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

public class CreatePagesDto {
    @Size(min = 3, max = 5592415, message = "error.header.size")
    private String header;
    @NotNull(message = "error.newsbody.notnull")
    @Size(min = 3, max = 5592415, message = "error.newsbody.size")
    private String body;


    public CreatePagesDto(String body, String header) {
        this.body = body;
        this.header = header;
    }

    public CreatePagesDto() {
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}
