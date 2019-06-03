package com.detrans.repository.dao;

import com.detrans.model.Document;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
@PreAuthorize("hasRole('ADMIN')")
public class DocumentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Document> getDocuments(Long id) {
        String hql = "from Document dc where dc.accreditedId = :id";
        Query query = entityManager.createQuery(hql);
        query.setParameter("id", id);
        return query.getResultList();
    }

}

