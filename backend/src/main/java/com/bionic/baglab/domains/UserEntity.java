package com.bionic.baglab.domains;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by username on 11.03.2017.
 */

@Entity
@Table(name = "user", schema = "baglab")
public class UserEntity {

    public final static String user = "Admin";

    private long idUser;
    private String login;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private long statusId;
    private Timestamp userCreate;
    private Timestamp userUpdate;
    private byte deleted;
    private Collection<OrderEntity> orders;
    private Collection<ModelEntity> models;
    public UserEntity() {
    }

    public UserEntity(long id) {
        this.idUser = id;
    }

    public UserEntity(String email, String lastname) {
        this.email = email;
        this.lastname = lastname;
    }
    /* private Collection<FeedbackEntity> feedbacksByIdUser;
    private Collection<ModelEntity> modelsByIdUser;
    private Collection<OrderEntity> ordersByIdUser;
    private Collection<ShippingAdressEntity> shippingAdressesByIdUser;
    private UserRoles roleByRoleId;
    private UserStatusEntity userStatusByStatusId;*/

    @Id
    @Column(name = "idUser", columnDefinition = "INT(11)")
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    @Basic
    @Column(name = "login")
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "firstname")
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @Basic
    @Column(name = "lastname")
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @OneToOne
    @JoinColumn(name = "roleId", columnDefinition = "INT(11)")
    public UserRole getRole() {
        return role;
    }

    @OneToMany(mappedBy = "user")
    public Collection<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(Collection<OrderEntity> orders) {
        this.orders = orders;
    }

    @OneToMany(mappedBy = "user")
    public Collection<ModelEntity> getModels() {
        return models;
    }

    public void setModels(Collection<ModelEntity> models) {
        this.models = models;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @Basic
    @Column(name = "statusId", columnDefinition = "INT(11)")
    public long getStatusId() {
        return statusId;
    }

    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }

    @Basic
    @Column(name = "userCreate")
    public Timestamp getUserCreate() {
        return userCreate;
    }

    public void setUserCreate(Timestamp userCreate) {
        this.userCreate = userCreate;
    }

    @Basic
    @Column(name = "userUpdate")
    public Timestamp getUserUpdate() {
        return userUpdate;
    }

    public void setUserUpdate(Timestamp userUpdate) {
        this.userUpdate = userUpdate;
    }


    @Basic
    @Column(name = "deleted", columnDefinition = "BitTypeDescriptor")
    //@Type(type = "org.hibernate.type.BigIntegerType") org.hibernate.type.descr
    public byte getDeleted() {
        return deleted;
    }

    public void setDeleted(byte deleted) {
        this.deleted = deleted;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (idUser != that.idUser) return false;
        if (statusId != that.statusId) return false;
        if (deleted != that.deleted) return false;
        if (login != null ? !login.equals(that.login) : that.login != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (firstname != null ? !firstname.equals(that.firstname) : that.firstname != null) return false;
        if (lastname != null ? !lastname.equals(that.lastname) : that.lastname != null) return false;
        if (role != null ? !role.equals(that.role) : that.role != null) return false;
        if (userCreate != null ? !userCreate.equals(that.userCreate) : that.userCreate != null) return false;
        if (userUpdate != null ? !userUpdate.equals(that.userUpdate) : that.userUpdate != null) return false;
        if (orders != null ? !orders.equals(that.orders) : that.orders != null) return false;
        return models != null ? models.equals(that.models) : that.models == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (idUser ^ (idUser >>> 32));
        result = 31 * result + (login != null ? login.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (firstname != null ? firstname.hashCode() : 0);
        result = 31 * result + (lastname != null ? lastname.hashCode() : 0);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        result = 31 * result + (int) (statusId ^ (statusId >>> 32));
        result = 31 * result + (userCreate != null ? userCreate.hashCode() : 0);
        result = 31 * result + (userUpdate != null ? userUpdate.hashCode() : 0);
        result = 31 * result + (int) deleted;
        result = 31 * result + (orders != null ? orders.hashCode() : 0);
        result = 31 * result + (models != null ? models.hashCode() : 0);
        return result;
    }
}
