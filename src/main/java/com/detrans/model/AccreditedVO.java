package com.detrans.model;

import com.detrans.service.CredentialService;

import java.io.Serializable;
import java.util.Objects;

public class AccreditedVO implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String name;
    private Long cpf;
    private UserStatusEnum statusEnum;
    private CredentialTypeEnum typeEnum;

    public AccreditedVO() {};

    public AccreditedVO(Long id, String name, Long cpf, UserStatusEnum statusEnum, CredentialTypeEnum typeEnum) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.statusEnum = statusEnum;

        this.typeEnum = typeEnum;
    }

    public AccreditedVO(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCpf() {
        return cpf;
    }

    public void setCpf(Long cpf) {
        this.cpf = cpf;
    }

    public UserStatusEnum getStatusEnum() {
        return statusEnum;
    }

    public void setStatusEnum(UserStatusEnum statusEnum) {
        this.statusEnum = statusEnum;
    }

    public CredentialTypeEnum getTypeEnum() {
        return typeEnum;
    }

    public void setTypeEnum(CredentialTypeEnum typeEnum) {
        this.typeEnum = typeEnum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AccreditedVO that = (AccreditedVO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (cpf != null ? !cpf.equals(that.cpf) : that.cpf != null) return false;
        if (statusEnum != that.statusEnum) return false;
        return typeEnum == that.typeEnum;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (cpf != null ? cpf.hashCode() : 0);
        result = 31 * result + (statusEnum != null ? statusEnum.hashCode() : 0);
        result = 31 * result + (typeEnum != null ? typeEnum.hashCode() : 0);
        return result;
    }
}