package com.detrans.repository.dao;

import com.detrans.model.Accredited;
import com.detrans.model.ActionEnum;
import com.detrans.model.Credential;
import com.detrans.model.CredentialHistoryVO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
@PreAuthorize("hasRole('ADMIN')")
public class CredentialDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Credential> getCredentialByUser(Long id) {
        String hql = "from Credential cr where cr.accredited.id = :id";
        Query query = entityManager.createQuery(hql);
        query.setParameter("id", id);
        return query.getResultList();
    }

    public boolean deleteCredential(Long id) {
        String hql = "delete from Credential cr where cr.accredited.id = :id";
        Query query = entityManager.createQuery(hql);
        query.setParameter("id", id);
        query.executeUpdate();
        return true;
    }

    public boolean accreditedHasCredential(Credential credential) {
        String hql = "from Credential cr where cr.accredited.id = :id";
        Query query = entityManager.createQuery(hql, Credential.class);
        query.setParameter("id", credential.getAccredited().getId());
        return query.getResultList().isEmpty();
    }

    public List<CredentialHistoryVO> getCredentialHistoryById (Long id, String pattern,
                                                    String filterBy, String searchBy, int page, int pageSize) {

        StringBuilder builder = new StringBuilder();
        builder.append("select new com.detrans.model.CredentialHistoryVO(");
        builder.append("c.id, ");
        builder.append("c.expireDate, ");
        builder.append("c.emissionDate, ");
        builder.append("c.register, ");
        builder.append("c.documentNumber, ");
        builder.append("c.accredited_id, ");
        builder.append("c.fileName, ");
        builder.append("c.action, ");
        builder.append("c.changedat, ");
        builder.append("c.credential_id, ");
        builder.append("c.lastchange_id) ");
        builder.append(" from CredentialHistoryVO c");
        builder.append(" where accredited_id = :id");
        builder.append(" ORDER BY c.action DESC");

        TypedQuery<CredentialHistoryVO> query = this.entityManager.createQuery(builder.toString(), CredentialHistoryVO.class);

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

    public CredentialHistoryVO getHistoryDetailById(Long id) {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT * FROM credential_audit WHERE id = :id");

        Query query = this.entityManager.createNativeQuery(builder.toString(), CredentialHistoryVO.class);
        query.setParameter("id", id);

        return (CredentialHistoryVO) query.getSingleResult();
    }


}
