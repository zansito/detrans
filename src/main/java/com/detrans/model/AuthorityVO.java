package com.detrans.model;

public class AuthorityVO {
    private Long user_id;
    private Long authority_id;

    public AuthorityVO() {};

    public AuthorityVO(Long user_id, Long authority_id) {
        this.user_id = user_id;
        this.authority_id = authority_id;
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

    @Override
    public String toString() {
        return "AuthorityVO{" +
                "user_id=" + user_id +
                ", authority_id=" + authority_id +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthorityVO that = (AuthorityVO) o;

        if (user_id != null ? !user_id.equals(that.user_id) : that.user_id != null) return false;
        return authority_id != null ? authority_id.equals(that.authority_id) : that.authority_id == null;
    }

    @Override
    public int hashCode() {
        int result = user_id != null ? user_id.hashCode() : 0;
        result = 31 * result + (authority_id != null ? authority_id.hashCode() : 0);
        return result;
    }
}
