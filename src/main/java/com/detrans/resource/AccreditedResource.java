package com.detrans.resource;

import com.detrans.model.Accredited;
import com.detrans.model.AccreditedVO;
import com.detrans.model.HistoryVO;
import com.detrans.service.AccreditedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Eugênio Machado on 03/10/2017.
 */
@RestController
@CrossOrigin("${permited-origin}")
public class AccreditedResource {

    @Autowired
    private AccreditedService accreditedService;

    @GetMapping(value="/accredited")
    public List<AccreditedVO> listAll(String pattern, String filterBy, String searchBy, int page, int pageSize) {
        List<AccreditedVO> accreditedList = accreditedService.getList(pattern, filterBy, searchBy, page, pageSize);
        return accreditedList;
    }

    @PostMapping("/accredited")
    public Accredited create(@RequestBody @Valid Accredited accredited) {
        return accreditedService.createOrUpdate(accredited);
    }

    @GetMapping("/accredited/{id}")
    public Accredited get(@PathVariable("id") Long id){
         return accreditedService.getById(id);
    }

    @GetMapping("/accredited/{id}/history")
    public List<HistoryVO> getHistoryById(@PathVariable("id") Long id, String pattern, String filterBy, String searchBy,
                                          int page, int pageSize) {
        return accreditedService.getHistoryById(id, pattern, filterBy, searchBy, page, pageSize);
    }

    @GetMapping("/accredited/detail/{id}")
    public HistoryVO getHistoryDetailById(@PathVariable("id") Long id) {
        return accreditedService.getHistoryDetailById(id);
    }
}
