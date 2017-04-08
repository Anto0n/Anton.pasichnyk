package com.bionic.baglab.dto.user;

import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.domains.UserRole;

import java.sql.Timestamp;

/**
 * Contains basic user data, EXCEPT  password
 */
public class UserDto {
    private long idUser;
    private String login; //exclude?
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private long statusId;
    private Timestamp userCreate;
    private Timestamp userUpdate;
    private byte deleted; //default 0 false
    //todo: add user fields, equals, hashcode


    public UserDto() {
    }

    public UserDto(UserEntity userEntity) {
        this.idUser = userEntity.getIdUser();
        this.login = userEntity.getLogin();
        this.email = userEntity.getEmail();
        this.firstname = userEntity.getFirstname();
        this.lastname = userEntity.getLastname();
        this.role = userEntity.getRole();
        this.statusId = userEntity.getStatusId();
        this.userCreate = userEntity.getUserCreate();
        this.userUpdate = userEntity.getUserUpdate();
//        this.deleted = userEntity.getDeleted();
    }


    public long getIdUser() {

        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public long getStatusId() {
        return statusId;
    }

    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }

    public byte getDeleted() {
        return deleted;
    }

    public void setDeleted(byte deleted) {
        this.deleted = deleted;
    }

    public Timestamp getUserCreate() {
        return userCreate;
    }

    public Timestamp getUserUpdate() {
        return userUpdate;
    }
}
