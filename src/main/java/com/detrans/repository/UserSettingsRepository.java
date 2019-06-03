package com.detrans.repository;

import com.detrans.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin("${permited-origin}")
@org.springframework.stereotype.Repository
public interface UserSettingsRepository extends JpaRepository<User, Long> {
        User findByUsername(String username);
        Optional<User> findByEmailIsLike(String email);
}
