package com.bionic.baglab.domains;

import com.bionic.baglab.dto.user.UserDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

/**
 * Created by username on 11.03.2017.
 */

@Entity
@Table(name = "[user]", schema = "baglab")
public class UserEntity {

    public final static String user = "Admin";

    private long idUser;
    @NotNull(message = "error.login.notnull")
    @Size(min = 1, max = 254, message = "error.login.size")
    private String login;
    @NotNull(message = "error.password.notnull")
    @Size(max = 64, message = "error.password.size")
    private String password;
    @NotNull(message = "error.email.notnull")
    @Size(min = 1, max = 254, message = "error.email.size")
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
//    private byte deleted;
    private Collection<OrderEntity> orders;
    private List<ModelEntity> models;
    public UserEntity() {
    }

    public UserEntity(long id) {
        this.idUser = id;
    }

    public UserEntity(String email, String lastname) {
        this.email = email;
        this.lastname = lastname;
    }

    //no password
    public UserEntity(UserDto userDto) {
        this.idUser = userDto.getIdUser();
        this.login = userDto.getLogin();
        //this.password = password;
        this.email = userDto.getEmail();
        this.firstname = userDto.getFirstname();
        this.lastname = userDto.getLastname();
        this.role = userDto.getRole();
        this.statusId = userDto.getStatusId();
    }

    /* private Collection<FeedbackEntity> feedbacksByIdUser;
    private Collection<ShippingAdressEntity> shippingAdressesByIdUser;
    private UserRoles roleByRoleId;
    private UserStatusEntity userStatusByStatusId;*/

    @Id
    @Column(name = "[idUser]", columnDefinition = "INT(11)")
    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }


    @Basic
    @Column(name = "[login]")
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Basic
    @Column(name = "[password]")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "[email]")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "[firstname]")
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @Basic
    @Column(name = "[lastname]")
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @OneToOne
    @JoinColumn(name = "[roleId]", columnDefinition = "INT(11)" )
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

    @OneToMany(mappedBy = "userEntity")
    public Collection<ModelEntity> getModels() {
        return models;
    }

    public void setModels(List<ModelEntity> models) {
        this.models = models;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @Basic
    @Column(name = "[statusId]", columnDefinition = "INT(11)")
    public long getStatusId() {
        return statusId;
    }

    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }

    @Basic
    @Column(name = "[userCreate]", insertable=false, updatable=false)
    public Timestamp getUserCreate() {
        return userCreate;
    }

    public void setUserCreate(Timestamp userCreate) {
        this.userCreate = userCreate;
    }

    @Basic
    @Column(name = "[userUpdate]", insertable=false, updatable=false)
    public Timestamp getUserUpdate() {
        return userUpdate;
    }

    public void setUserUpdate(Timestamp userUpdate) {
        this.userUpdate = userUpdate;
    }


//    @Basic
//    @Column(name = "deleted", columnDefinition = "BitTypeDescriptor")
//    //@Type(type = "org.hibernate.type.BigIntegerType") org.hibernate.type.descr
//    public byte getDeleted() {
//        return deleted;
//    }
//
//    public void setDeleted(byte deleted) {
//        this.deleted = deleted;
//    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity)) return false;
        UserEntity that = (UserEntity) o;
        if (getIdUser() != that.getIdUser()) return false;
        if (getStatusId() != that.getStatusId()) return false;
        if (getLogin() != null ? !getLogin().equals(that.getLogin()) : that.getLogin() != null) return false;
        if (getPassword() != null ? !getPassword().equals(that.getPassword()) : that.getPassword() != null)
            return false;
        if (getEmail() != null ? !getEmail().equals(that.getEmail()) : that.getEmail() != null) return false;
        if (getFirstname() != null ? !getFirstname().equals(that.getFirstname()) : that.getFirstname() != null)
            return false;
        if (getLastname() != null ? !getLastname().equals(that.getLastname()) : that.getLastname() != null)
            return false;
        if (getRole() != null ? !getRole().equals(that.getRole()) : that.getRole() != null) return false;
        if (getUserCreate() != null ? !getUserCreate().equals(that.getUserCreate()) : that.getUserCreate() != null)
            return false;
        if (getUserUpdate() != null ? !getUserUpdate().equals(that.getUserUpdate()) : that.getUserUpdate() != null)
            return false;
        return getOrders() != null ? getOrders().equals(that.getOrders()) : that.getOrders() == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (getIdUser() ^ (getIdUser() >>> 32));
        result = 31 * result + (getLogin() != null ? getLogin().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        result = 31 * result + (getFirstname() != null ? getFirstname().hashCode() : 0);
        result = 31 * result + (getLastname() != null ? getLastname().hashCode() : 0);
        result = 31 * result + (getRole() != null ? getRole().hashCode() : 0);
        result = 31 * result + (int) (getStatusId() ^ (getStatusId() >>> 32));
        result = 31 * result + (getUserCreate() != null ? getUserCreate().hashCode() : 0);
        result = 31 * result + (getUserUpdate() != null ? getUserUpdate().hashCode() : 0);
        result = 31 * result + (getOrders() != null ? getOrders().hashCode() : 0);
        return result;
    }
}
