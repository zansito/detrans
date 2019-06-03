package com.detrans.repository.dao;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.List;

@Transactional
@Repository
@PreAuthorize("hasRole('ADMIN')")
public class DashboardDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public <T> List<T> getNeighborhood() {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT neighborhood, COUNT (neighborhood) ");
        builder.append("FROM accredited a ");
        builder.append("join credential c ON c.accredited_id = a.id ");
        builder.append("GROUP BY neighborhood");
        return abstractCall(builder.toString());
    }

    public<T> List<T> getCredentialType() {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT a.type_enum, COUNT (a.type_enum) ");
        builder.append("FROM accredited a ");
        builder.append("join credential c ON c.accredited_id = a.id ");
        builder.append("GROUP BY type_enum ");
        return abstractCall(builder.toString());
    }

    public<T> List<T> getListByMonthCurrentYear() {
        StringBuilder builder = new StringBuilder();
        builder.append("SELECT MONTH(emission_date) , COUNT(emission_date) ");
        builder.append("FROM detrans.credential ");
        builder.append("WHERE emission_date >= NOW() - INTERVAL 1 YEAR ");
        builder.append("GROUP BY MONTH(emission_date) ");
        return abstractCall(builder.toString());
    }

    public<T> List<T> getLastYear() {
        StringBuilder builder = new StringBuilder();
        int year = Calendar.getInstance().get(Calendar.YEAR);
        int finalyear = year - 1;

        String q = "SELECT MONTH(emission_date) , COUNT(emission_date)"
                + " FROM detrans.credential WHERE YEAR(emission_date) = "
                +   finalyear + " GROUP BY MONTH(emission_date)";


        Query query = this.entityManager.createNativeQuery(q);

        return query.getResultList();
    }

    public<T> List<T> getPenultimateYear() {
        StringBuilder builder = new StringBuilder();
        int year = Calendar.getInstance().get(Calendar.YEAR);
        int finalyear = year - 2;

        String q = "SELECT MONTH(emission_date) , COUNT(emission_date)" +
                " FROM detrans.credential WHERE YEAR(emission_date) = " + finalyear + " GROUP BY MONTH(emission_date)";

        return abstractCall(q.toString());
    }

    public<T> List<T> getAntiPenultimateYear() {
        StringBuilder builder = new StringBuilder();

        int year = Calendar.getInstance().get(Calendar.YEAR);
        int finalyear = year - 3;

        String q = "SELECT MONTH(emission_date) , COUNT(emission_date)" +
                " FROM detrans.credential WHERE YEAR(emission_date) = " + finalyear + "" +
                " GROUP BY MONTH(emission_date)";

        return abstractCall(q.toString());
    }

    public <T> List<T> getCredentialByCurrentYearAndFilterByTypes() {
        StringBuilder builder = new StringBuilder();

        builder.append("SELECT a.type_enum, COUNT(a.type_enum), MONTH(c.emission_date) ");
        builder.append("from accredited a ");
        builder.append("inner join credential c ON c.accredited_id = a.id ");
        builder.append("WHERE YEAR(c.emission_date) = YEAR(CURDATE()) ");
        builder.append("GROUP BY MONTH(c.emission_date), a.type_enum");

        return abstractCall(builder.toString());
    }


    private<T> List<T> abstractCall(String builder) {
        Query query = this.entityManager.createNativeQuery(builder.toString());
        return query.getResultList();
    }
}
