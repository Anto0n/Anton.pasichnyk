package com.bionic.baglab.dto.user;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SendMailFromUserDto {
    @NotNull(message = "error.name.notnull")
    @Size(min = 1, max = 45, message = "error.name.size")
    private String name;
    @NotNull(message = "error.lastname.notnull")
    @Size(min = 1, max = 45, message = "error.lastname.size")
    private String lastname;
    @NotNull(message = "error.email.notnull")
    @Size(min = 3, max = 254, message = "error.email.size")
    private String email;
    private String phone;
    @NotNull(message = "error.message.notnull")
    @Size(min = 3,  message = "error.name.message.min3")
    private String message;

    public SendMailFromUserDto() {
    }

    public SendMailFromUserDto(String name, String lastname, String email, String phone, String message) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
