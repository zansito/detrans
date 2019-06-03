package com.detrans.service;

import com.detrans.repository.dao.DashboardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {
    @Autowired
    private DashboardDAO dashboardDAO;

    public <T> List<T> getNeighborhood() {
        return dashboardDAO.getNeighborhood();
    }

    public <T> List<T> getCredentialType() { return dashboardDAO.getCredentialType(); }

    public Object getListByMonthCurrentYear() {
        List arrCurrent = dashboardDAO.getListByMonthCurrentYear();
        List arrLast = dashboardDAO.getLastYear();
        List arrPenultimate = dashboardDAO.getPenultimateYear();
        List arrAntiPenultimate = dashboardDAO.getAntiPenultimateYear();

        Object merged = new Object[]{arrCurrent, arrLast, arrPenultimate, arrAntiPenultimate};
        return merged;
    }

    public <T> List<T> fillBarChart() { return dashboardDAO.getCredentialByCurrentYearAndFilterByTypes(); }
}
