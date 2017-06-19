package com.bionic.baglab.dto.user;

import com.bionic.baglab.domains.UserRole;

import javax.validation.constraints.NotNull;

public class UserRoleDto {
    @NotNull(message = "error.idRole.notnull")
    private long idRole;
    private String name;
    private String description;
    private Byte deleted;

    public UserRoleDto() {
    }

    public UserRoleDto(long idRole, String name, String description, Byte deleted) {
        this.idRole = idRole;
        this.name = name;
        this.description = description;
        this.deleted = deleted;
    }

    public UserRoleDto(UserRole ent) {
        this.idRole = ent.getIdRole();
        this.name = ent.getName();
        this.description = ent.getDescription();
        this.deleted = ent.getDeleted();
    }

    public long getIdRole() {
        return idRole;
    }

    public void setIdRole(long idRole) {
        this.idRole = idRole;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Byte getDeleted() {
        return deleted;
    }

    public void setDeleted(Byte deleted) {
        this.deleted = deleted;
    }
}
