package com.detrans.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "DOCUMENT")
public class Document {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "FILENAME", length = 100, unique = true)
    private String fileName;

    @Column(name = "ACCREDITEDID", length = 100, unique = true)
    private Long accreditedId;

    @Column(name = "UPLOADDATE", length = 100, unique = true)
    @Temporal(TemporalType.DATE)
    private Date uploadDate;

    @Column(name = "CREATEDBY")
    private Long createdBy;

    @Column(name = "CREATEDBYNAME", length = 150, unique = true)
    private String createdByName;

    public Document() {};

    public Document(String fileName, Long accreditedId, Date uploadDate, Long createdBy, String createdByName) {
        this.fileName = fileName;
        this.accreditedId = accreditedId;
        this.uploadDate = uploadDate;
        this.createdBy = createdBy;
        this.createdByName = createdByName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getAccreditedId() {
        return accreditedId;
    }

    public void setAccreditedId(Long accreditedId) {
        this.accreditedId = accreditedId;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }
}
