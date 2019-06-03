package com.detrans.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class UserVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private boolean enabled;
    private Date lastPasswordResetDate;
    private Long user_id;
    private Long authority_id;
    private boolean admin;


    public UserVO() {}

    public UserVO(long id, String email, boolean enabled, String name){
        this.id = id;
        this.email = email;
        this.enabled = enabled;
        this.name = name;
    }

    public UserVO(long id, String username, String password, String name, String email, boolean enabled,
                  Date lastPasswordResetDate, Long user_id, Long authority_id, Boolean admin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.enabled = enabled;
        this.lastPasswordResetDate = lastPasswordResetDate;
        this.user_id = user_id;
        this.authority_id = authority_id;
        this.admin = admin;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getAuthority_id() {
        return authority_id;
    }

    public void setAuthority_id(Long authority_id) {
        this.authority_id = authority_id;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserVO userVO = (UserVO) o;
        return admin == userVO.admin &&
                Objects.equals(id, userVO.id) &&
                Objects.equals(username, userVO.username) &&
                Objects.equals(password, userVO.password) &&
                Objects.equals(name, userVO.name) &&
                Objects.equals(email, userVO.email) &&
                Objects.equals(enabled, userVO.enabled) &&
                Objects.equals(lastPasswordResetDate, userVO.lastPasswordResetDate) &&
                Objects.equals(user_id, userVO.user_id) &&
                Objects.equals(authority_id, userVO.authority_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, name, email, enabled, lastPasswordResetDate, user_id, authority_id, admin);
    }

    @Override
    public String toString() {
        return "UserVO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", enabled=" + enabled +
                ", lastPasswordResetDate=" + lastPasswordResetDate +
                ", user_id=" + user_id +
                ", authority_id=" + authority_id +
                ", admin=" + admin +
                '}';
    }
}
