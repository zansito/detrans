package com.detrans.resource;

import com.detrans.model.User;
import com.detrans.model.UserVO;
import com.detrans.repository.UserSettingsRepository;
import com.detrans.repository.dao.UserDAO;
import com.detrans.security.repository.UserRepository;
import com.detrans.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("${permited-origin}")
@PreAuthorize("hasRole('ADMIN')")
public class UserResource {
    private static int workload = 12;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private UserSettingsRepository userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/users")
    public List<UserVO> list(String pattern, String filterBy, String searchBy, int page, int pageSize){
        return userDAO.getUsers(pattern, filterBy, searchBy, page, pageSize);
    }

    @PostMapping("/users")
    public User create(@RequestBody @Valid User user) {

        if(!user.getPassword().startsWith("$2a$")) {
            user.setPassword(hashPassword(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @GetMapping("/users/{username}")
    public User get(@PathVariable("username") String username){
        return userDAO.getUserByUserName(username);
    }

    @GetMapping("/get-user/{id}")
    public Object getUserById(@PathVariable("id") Long id) { return userDAO.getUserById(id); }

    public static String hashPassword(String password) {
        String salt = BCrypt.gensalt(workload);
        String hashed_password = BCrypt.hashpw(password, salt);

        return(hashed_password);
    }

    public static boolean checkPassword(String password_plaintext, String stored_hash) {
        boolean password_verified = false;

        if(null == stored_hash || !stored_hash.startsWith("$2a$"))
            throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");

        password_verified = BCrypt.checkpw(password_plaintext, stored_hash);

        return(password_verified);
    }


}
