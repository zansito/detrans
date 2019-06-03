package com.detrans.repository;

import com.detrans.model.Accredited;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AccreditedRepository extends JpaRepository<Accredited, Long> {

}
