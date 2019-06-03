package com.detrans.repository.dao;

import com.detrans.model.AuthorityVO;
import com.detrans.model.User;
import com.detrans.model.UserVO;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
@PreAuthorize("hasRole('ADMIN')")
@org.springframework.stereotype.Repository
public class UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public User getUserByUserName(String username) {
        String hql = "SELECT NEW com.detrans.model.User(u.id, u.name, u.username, u.admin) from User u where u.username = :username";
        Query query = entityManager.createQuery(hql);
        query.setParameter("username", username);
        return (User) query.getSingleResult();
    }

    public Object getUserById(Long id) {
        StringBuilder builder = new StringBuilder();

        builder.append("SELECT * FROM user U WHERE U.ID = :id ");
        Query query = entityManager.createNativeQuery(builder.toString());
        query.setParameter("id", id);

        return query.getSingleResult();

    }

    public User getUserByMail(String email) {
        StringBuilder builder = new StringBuilder();

        String qr = "SELECT * FROM user U WHERE U.email LIKE '" + email + "%'";
        Query query = entityManager.createNativeQuery(qr, User.class);

        return (User) query.getSingleResult();
    }

    public Object findByEmail(String email) {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT * FROM user U WHERE U.email = :email");
        String q = "SELECT * FROM user U WHERE U.email LIKE '" + email + "%'";
        Query query = entityManager.createNativeQuery(q.toString());

        return query.getSingleResult();
    }

    public User findByResetToken(String token) {
        StringBuilder builder = new StringBuilder();

        String qr = "SELECT * FROM user U WHERE U.reset_token LIKE '" + token + "'";
        Query query = entityManager.createNativeQuery(qr, User.class);

        return (User) query.getSingleResult();
    }

    public List<UserVO> getUsers(String pattern, String filterBy, String searchBy, int page, int pageSize)  {

        StringBuilder builder = new StringBuilder();
        builder.append("select new com.detrans.model.UserVO(");
        builder.append("u.id, ");
        builder.append("u.email, ");
        builder.append("u.enabled, ");
        builder.append("u.name) ");
        builder.append("from User u");

        if (searchBy != null && searchBy.equals("EMAIL")) {
            builder.append(" where u.email like UPPER(:pattern)");
        }

        if(searchBy != null && searchBy.equals("NAME") && pattern != "") {
            builder.append(" where u.name like UPPER(:pattern)");
        }

        if (searchBy != null && searchBy.equals("ACTIVE")  && pattern ==  "") {
            builder.append(" where u.enabled = 1" );
        }

        if (searchBy != null && searchBy.equals("INACTIVE") && pattern ==  "") {
            builder.append(" where u.enabled = 0" );
        }


        if (searchBy == null && pattern !=  "") {
            builder.append(" where u.name like UPPER(:pattern)");
        }else if (filterBy != null && pattern != "") {
            builder.append(" and a.name like UPPER(:filterBy)");
        }

        TypedQuery<UserVO> query = this.entityManager.createQuery(builder.toString(), UserVO.class);

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

}
