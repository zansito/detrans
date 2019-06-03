package com.detrans.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date expireDate;
    @Temporal(TemporalType.DATE)
    private Date emissionDate;
    @NotEmpty
    private String register;
    @NotEmpty
    private String documentNumber;
    @OneToOne(cascade = CascadeType.ALL)
    private Accredited accredited;
    @NotEmpty
    private String fileName;
    @Enumerated(EnumType.STRING)
    private ActionEnum action;
    @Temporal(TemporalType.DATE)
    private Date changedat;
    private Long lastchangeId;

    public Credential() {}

    public Credential(Date expireDate, Date emissionDate, String register, String documentNumber,
                      Accredited accredited, String fileName, ActionEnum action, Date changedat, Long lastchangeId) {
        this.expireDate = expireDate;
        this.emissionDate = emissionDate;
        this.register = register;
        this.documentNumber = documentNumber;
        this.accredited = accredited;
        this.fileName = fileName;
        this.action = action;
        this.changedat = changedat;
        this.lastchangeId = lastchangeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public Date getEmissionDate() {
        return emissionDate;
    }

    public void setEmissionDate(Date emissionDate) {
        this.emissionDate = emissionDate;
    }

    public String getNumber() {
        return register;
    }

    public void setNumber(String number) {
        this.register = number;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public Accredited getAccredited() {
        return accredited;
    }

    public void setAccredited(Accredited accredited) {
        this.accredited = accredited;
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public ActionEnum getAction() {
        return action;
    }

    public void setAction(ActionEnum action) {
        this.action = action;
    }

    public Date getChangedat() {
        return changedat;
    }

    public void setChangedat(Date changedat) {
        this.changedat = changedat;
    }

    public Long getLastchangeId() {
        return lastchangeId;
    }

    public void setLastchangeId(Long lastchangeId) {
        this.lastchangeId = lastchangeId;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Credential other = (Credential) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
