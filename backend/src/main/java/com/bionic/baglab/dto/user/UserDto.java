package com.bionic.baglab.dto.user;

import com.bionic.baglab.domains.UserEntity;
import com.bionic.baglab.domains.UserRole;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

/**
 * Contains basic user data, EXCEPT  password
 */
public class UserDto {
    private long idUser;
    @NotNull(message = "error.login.notnull")
    @Size(min = 1, max = 254, message = "error.login.size")
    private String login;
    @NotNull(message = "error.email.notnull")
    @Size(min = 3, max = 254, message = "error.email.size")
    private String email;
    @NotNull(message = "error.firstname.notnull")
    @Size(min = 1, max = 45, message = "error.firstname.size")
    private String firstname;
    @NotNull(message = "error.lastname.notnull")
    @Size(min = 1, max = 45, message = "error.lastname.size")
    private String lastname;
    @NotNull(message = "error.role.notnull")
    private UserRole role;
    @NotNull(message = "error.statusId.notnull")
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

    public UserEntity renewUserEntityFromUserDto(UserEntity oldUserEntity){
        oldUserEntity.setLogin(this.getLogin());
        oldUserEntity.setEmail(this.getEmail());
        oldUserEntity.setFirstname(this.getFirstname());
        oldUserEntity.setLastname(this.getLastname());
        oldUserEntity.setRole(this.getRole());
        oldUserEntity.setStatusId(this.getStatusId());
//        this.deleted = userEntity.getDeleted();
    return  oldUserEntity;
    }


}
