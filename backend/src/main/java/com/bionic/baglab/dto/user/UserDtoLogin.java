
package com.bionic.baglab.dto.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserDtoLogin {
    @NotNull(message = "error.login.notnull")
    @Size(min = 1, max = 254, message = "error.login.size")
    private String login;
    @NotNull(message = "error.password.notnull")
    @Size(min = 1, max = 64, message = "error.password.size")
    private String password;

    public UserDtoLogin() {
    }

    public UserDtoLogin(String login, String password) {
        this.login = login;
        this.password = password;
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
