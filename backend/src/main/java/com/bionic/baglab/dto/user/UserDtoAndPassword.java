package com.bionic.baglab.dto.user;

public class UserDtoAndPassword {
    UserDto userDto;
    String password;

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
