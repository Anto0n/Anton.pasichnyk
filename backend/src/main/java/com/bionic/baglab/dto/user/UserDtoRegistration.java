package com.bionic.baglab.dto.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Two DTO objects in on
 * POST can send&receive only one object
 */
public class UserDtoRegistration {
    @NotNull(message = "error.password.notnull")
    @Size(min = 1, max = 64, message = "error.password.size")
    private String password;
    @NotNull(message = "error.email.notnull")
    private String email;
    @NotNull(message = "error.firstname.notnull")
    private String firstname;
    @NotNull(message = "error.lastname.notnull")
    private String lastname;

    public UserDtoRegistration() {
    }


    public UserDtoRegistration(String password, String email, String firstname, String lastname) {
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
