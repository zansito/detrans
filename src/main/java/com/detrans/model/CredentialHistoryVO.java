package com.detrans.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "credential_audit")
public class CredentialHistoryVO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date expireDate;
    @Temporal(TemporalType.DATE)
    private Date emissionDate;
    private String register;
    private String documentNumber;
    private Long accredited_id;
    private String fileName;
    private String action;
    private String changedat;
    private Long credential_id;
    private Long lastchange_id;

    public CredentialHistoryVO() {}

    public CredentialHistoryVO(Long id, Date expireDate, Date emissionDate,
                               String register, String documentNumber,
                               Long accredited_id,
                               String fileName, String action, String changedat, Long credential_id,
                               Long lastchange_id) {
        this.id = id;
        this.expireDate = expireDate;
        this.emissionDate = emissionDate;
        this.register = register;
        this.documentNumber = documentNumber;
        this.accredited_id = accredited_id;
        this.fileName = fileName;
        this.action = action;
        this.changedat = changedat;
        this.credential_id = credential_id;
        this.lastchange_id = lastchange_id;
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

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public Long getAccredited_id() {
        return accredited_id;
    }

    public void setAccredited_id(Long accredited_id) {
        this.accredited_id = accredited_id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getChangedat() {
        return changedat;
    }

    public void setChangedat(String changedat) {
        this.changedat = changedat;
    }

    public Long getCredential_id() {
        return credential_id;
    }

    public void setCredential_id(Long credential_id) {
        this.credential_id = credential_id;
    }

    public Long getLastchange_id() {
        return lastchange_id;
    }

    public void setLastchange_id(Long lastchange_id) {
        this.lastchange_id = lastchange_id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }
}
