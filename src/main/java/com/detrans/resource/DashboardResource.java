package com.detrans.resource;

import com.detrans.model.AccreditedVO;
import com.detrans.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("${permited-origin}")
@RequestMapping("/dashboard")
public class DashboardResource {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping(value="/neighboorhood")
    public <T> List<T> list(String pattern) {
        return this.dashboardService.getNeighborhood();
    }

    @GetMapping(value="/credentialtype")
    public <T> List<T> listCredentialType() {
        return this.dashboardService.getCredentialType();
    }

    @GetMapping(value="/monthyear")
    public Object listByMonthCurrentYear() {
        return this.dashboardService.getListByMonthCurrentYear();
    }

    @GetMapping(value="/barchart")
    public Object fillbarchart() {
        return this.dashboardService.fillBarChart();
    }
}
