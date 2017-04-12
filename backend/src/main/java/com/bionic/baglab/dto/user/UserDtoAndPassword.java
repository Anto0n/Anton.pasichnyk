package com.bionic.baglab.dto.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserDtoAndPassword {
    @NotNull(message = "error.userDto.notnull")
    private UserDto userDto;
    @NotNull(message = "error.password.notnull")
    @Size(min = 1, max = 64, message = "error.password.size")
    private String password;

    public UserDtoAndPassword() {
    }

    public UserDtoAndPassword(UserDto userDto, String password) {
        this.userDto = userDto;
        this.password = password;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
