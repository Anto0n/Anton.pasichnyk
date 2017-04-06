package com.bionic.baglab.domains;

import javax.persistence.*;

@Entity
@Table(name = "role", schema = "baglab")
public class UserRole {
    private long idRole;
    private String name;
    private String description;
    private Byte deleted;

    @Id
    @Column(name = "idRole", columnDefinition = "INT(11)")
    public long getIdRole() {
        return idRole;
    }

    public void setIdRole(long idRole) {
        this.idRole = idRole;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "description", columnDefinition="mediumtext")
//    @Lob
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "deleted", columnDefinition = "BitTypeDescriptor")
    //@Type(type = "org.hibernate.type.BigIntegerType") org.hibernate.type.descr
    public byte getDeleted() {
        return deleted;
    }

    public void setDeleted(Byte deleted) {
        this.deleted = deleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserRole that = (UserRole) o;

        if (idRole != that.idRole) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (deleted != null ? !deleted.equals(that.deleted) : that.deleted != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        long result = idRole;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (deleted != null ? deleted.hashCode() : 0);
        return (int)result;
    }
}
