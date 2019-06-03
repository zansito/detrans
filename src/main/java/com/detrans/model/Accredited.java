package com.detrans.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Accredited {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    private String name;
    @Enumerated(EnumType.STRING)
    private GenderEnum genderEnum;
    @Temporal(TemporalType.DATE)
    private Date birth_date;
    private String rg;
    private String cnh;
    private Long cpf;
    private String city;
    private String address;
    private String neighborhood;
    private String residential_phone;
    private String cel_phone;
    private String email;
    @Temporal(TemporalType.DATE)
    private Date childbirth;
    private String mothername;
    private String mothercnh;
    private String fathername;
    private String fathercnh;
    private String namerep;
    private String phonerep;
    private String rgrep;
    @Enumerated(EnumType.STRING)
    private UserStatusEnum statusEnum;
    @Enumerated(EnumType.STRING)
    private CredentialTypeEnum typeEnum;
    private String comment;
    @Enumerated(EnumType.STRING)
    private ActionEnum action;
    @Temporal(TemporalType.DATE)
    private Date changedat;
    private Long lastchangeId;

    public Accredited(){
    }

    public Accredited(String name, GenderEnum genderEnum, Date birth_date, String rg, String cnh, Long cpf, String city,
                      String address, String neighborhood, String residential_phone, String cel_phone, String email,
                      Date childbirth, String mothername, String mothercnh, String fathername, String fathercnh,
                      String namerep, String phonerep, String rgrep, UserStatusEnum statusEnum,
                      CredentialTypeEnum typeEnum, String comment, ActionEnum action, Date changedat, Long lastchangeId) {
        this.name = name;
        this.genderEnum = genderEnum;
        this.birth_date = birth_date;
        this.rg = rg;
        this.cnh = cnh;
        this.cpf = cpf;
        this.city = city;
        this.address = address;
        this.neighborhood = neighborhood;
        this.residential_phone = residential_phone;
        this.cel_phone = cel_phone;
        this.email = email;
        this.childbirth = childbirth;
        this.mothername = mothername;
        this.mothercnh = mothercnh;
        this.fathername = fathername;
        this.fathercnh = fathercnh;
        this.namerep = namerep;
        this.phonerep = phonerep;
        this.rgrep = rgrep;
        this.statusEnum = statusEnum;
        this.typeEnum = typeEnum;
        this.comment = comment;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GenderEnum getGenderEnum() {
        return genderEnum;
    }

    public void setGenderEnum(GenderEnum genderEnum) {
        this.genderEnum = genderEnum;
    }

    public Date getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(Date birth_date) {
        this.birth_date = birth_date;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCnh() {
        return cnh;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }


    public Long getCpf() {
        return cpf;
    }

    public void setCpf(Long cpf) {
        this.cpf = cpf;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getResidential_phone() {
        return residential_phone;
    }

    public void setResidential_phone(String residential_phone) {
        this.residential_phone = residential_phone;
    }

    public String getCel_phone() {
        return cel_phone;
    }

    public void setCel_phone(String cel_phone) {
        this.cel_phone = cel_phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getChildbirth() {
        return childbirth;
    }

    public void setChildbirth(Date childbirth) {
        this.childbirth = childbirth;
    }

    public String getMothername() {
        return mothername;
    }

    public void setMothername(String mothername) {
        this.mothername = mothername;
    }

    public String getMothercnh() {
        return mothercnh;
    }

    public void setMothercnh(String mothercnh) {
        this.mothercnh = mothercnh;
    }

    public String getFathername() {
        return fathername;
    }

    public void setFathername(String fathername) {
        this.fathername = fathername;
    }

    public String getFathercnh() {
        return fathercnh;
    }

    public void setFathercnh(String fathercnh) {
        this.fathercnh = fathercnh;
    }

    public String getNamerep() {
        return namerep;
    }

    public void setNamerep(String namerep) {
        this.namerep = namerep;
    }

    public String getPhonerep() {
        return phonerep;
    }

    public void setPhonerep(String phonerep) {
        this.phonerep = phonerep;
    }

    public String getRgrep() {
        return rgrep;
    }

    public void setRgrep(String rgrep) {
        this.rgrep = rgrep;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Accredited other = (Accredited) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
