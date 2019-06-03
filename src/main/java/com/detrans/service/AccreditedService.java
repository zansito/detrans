package com.detrans.service;

import com.detrans.model.Accredited;
import com.detrans.model.AccreditedVO;
import com.detrans.model.HistoryVO;
import com.detrans.repository.AccreditedRepository;
import com.detrans.repository.dao.AccreditedDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AccreditedService {

    @Autowired
    private AccreditedRepository accreditedRepository;
    @Autowired
    private AccreditedDAO accreditedDAO;

    public Page<Accredited> listAllByPage(Pageable pageable) {
        return accreditedRepository.findAll(pageable);
    }

    public Page<Accredited> listWithFilters(String name) {
        return accreditedDAO.searchByName(name);
    }


    public Accredited createOrUpdate(Accredited accredited) {
        return accreditedRepository.save(accredited);
    }

    public Accredited getById(Long id) {
        return accreditedRepository.findOne(id);
    }

    public List<AccreditedVO> getList(String pattern, String filterBy, String searchBy, int page, int pageSize) {
        return accreditedDAO.getAccrediteds(pattern, filterBy, searchBy, page, pageSize);
    }

    public List<HistoryVO> getHistoryById(Long id, String pattern, String filterBy,
                                          String searchBy, int page, int pageSize) {
        List<HistoryVO> lizt = accreditedDAO.getHistoryById(id, pattern, filterBy, searchBy, page, pageSize);
        return lizt;
    }

    public HistoryVO getHistoryDetailById(Long id) {
        return accreditedDAO.getHistoryDetailById(id);
    }

}
