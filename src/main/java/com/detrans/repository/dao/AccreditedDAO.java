package com.detrans.repository.dao;

import com.detrans.model.Accredited;
import com.detrans.model.AccreditedVO;
import com.detrans.model.HistoryVO;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;


@Transactional
@Repository
@PreAuthorize("hasRole('ADMIN')")
public class AccreditedDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<AccreditedVO> getAccrediteds(String pattern, String filterBy, String searchBy, int page, int pageSize)  {

        StringBuilder builder = new StringBuilder();
        builder.append("select new com.detrans.model.AccreditedVO(");
        builder.append("a.id, ");
        builder.append("a.name, ");
        builder.append("a.cpf, ");
        builder.append("a.statusEnum, ");
        builder.append("a.typeEnum)");
        builder.append(" from Accredited a");


        if (pattern != "" && searchBy == null) {
            builder.append(" where UPPER(a.name) like UPPER(:pattern)");
        }

        if (searchBy != null && searchBy.equals("NAME")) {
            builder.append(" where a.name like UPPER(:pattern)");
        }

        if(searchBy != null && searchBy.equals("CPF")) {
            builder.append(" where a.cpf like UPPER(:pattern)");
        }

        if(searchBy != null && searchBy.equals("statusEnum")){
            builder.append(" where a.statusEnum like UPPER(:pattern)");
        }

        if (filterBy != null && pattern ==  "") {
            builder.append(" where a.typeEnum like UPPER(:filterBy)");
        }else if (filterBy != null && pattern != "") {
            builder.append(" and a.typeEnum like UPPER(:filterBy)");
        }

        TypedQuery<AccreditedVO> query = this.entityManager.createQuery(builder.toString(), AccreditedVO.class);

        if (pattern != "") {
            query.setParameter("pattern", "%" + pattern + "%");
        }

        if (filterBy != null && filterBy != "") {
            query.setParameter("filterBy", filterBy);
        }

        query.setMaxResults(pageSize);
        query.setFirstResult(((page - 1) * pageSize));

        return query.getResultList();
    }

    public Page<Accredited> searchByName (String name) {
        TypedQuery query = entityManager.createQuery("select a from Accredited a where a.name = ?1", Accredited.class);
        query.setParameter(1, name);

        return (Page<Accredited>) query.getResultList();
    }

    public List<HistoryVO> getHistoryById(Long id, String pattern,
                                          String filterBy, String searchBy, int page, int pageSize) {

        StringBuilder builder = new StringBuilder();
        builder.append("select new com.detrans.model.HistoryVO(");
        builder.append("a.id, ");
        builder.append("a.name, ");
        builder.append("a.genderEnum, ");
        builder.append("a.birth_date, ");
        builder.append("a.rg, ");
        builder.append("a.cnh, ");
        builder.append("a.cpf, ");
        builder.append("a.city, ");
        builder.append("a.address, ");
        builder.append("a.neighborhood, ");
        builder.append("a.residential_phone, ");
        builder.append("a.cel_phone, ");
        builder.append("a.email, ");
        builder.append("a.childbirth, ");
        builder.append("a.mothername, ");
        builder.append("a.mothercnh, ");
        builder.append("a.fathername, ");
        builder.append("a.fathercnh, ");
        builder.append("a.namerep, ");
        builder.append("a.phonerep, ");
        builder.append("a.rgrep, ");
        builder.append("a.statusEnum, ");
        builder.append("a.typeEnum, ");
        builder.append("a.comment, ");
        builder.append("a.action, ");
        builder.append("a.changedat, ");
        builder.append("a.lastchangeId) ");
        builder.append(" from HistoryVO a");
        builder.append(" where accredited_id = :id");

        if (filterBy != null && filterBy.equals("ASC")) {
            builder.append(" ORDER by a.changedat ASC ");
        }


        if (filterBy != null && filterBy != "DESC" && filterBy != "ASC" && pattern ==  "") {
            builder.append(" and a.action like UPPER(:filterBy)");
        }

        if(filterBy != null && filterBy.equals("DESC")) {
            builder.append(" ORDER by a.changedat DESC ");
        }

        if(searchBy != null && searchBy.equals("ALTERADO")) {
            builder.append(" and a.action like UPPER(:ALTERADO)");
        }


        TypedQuery<HistoryVO> query = this.entityManager.createQuery(builder.toString(), HistoryVO.class);

        if (pattern != "") {
            query.setParameter("pattern", "%" + pattern + "%");
        }

        if (filterBy != null && filterBy != "") {
            query.setParameter("filterBy", filterBy);
        }

        query.setParameter("id", id);
        query.setMaxResults(pageSize);
        query.setFirstResult(((page - 1) * pageSize));

        return query.getResultList();
    }

    public HistoryVO getHistoryDetailById(Long id) {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT * FROM accredited_audit WHERE id = :id");

        Query query = this.entityManager.createNativeQuery(builder.toString(), HistoryVO.class);
        query.setParameter("id", id);


        return (HistoryVO) query.getSingleResult();
    }

}
