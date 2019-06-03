package com.detrans.security;

import com.detrans.model.User;
import com.detrans.repository.UserSettingsRepository;
import com.detrans.repository.dao.UserDAO;
import com.detrans.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin("${permited-origin}")
@PreAuthorize("hasRole('ADMIN')")
public class PasswordController {


    @Autowired
    private UserSettingsRepository userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDAO userDAO;

    @RequestMapping(value = "/forgot", method = RequestMethod.GET)
    public ModelAndView displayForgotPasswordPage() {
        return new ModelAndView("forgotPassword");
    }

    @RequestMapping(value = "/forgot-me/{email}", method = RequestMethod.GET)
    public ResponseEntity<String> processForgotPasswordForm(ModelAndView modelAndView, @PathVariable("email") String userEmail, HttpServletRequest request) {

         User optional =userDAO.getUserByMail(userEmail);

        optional.setResetToken(UUID.randomUUID().toString());

            userService.save(optional);

            String appUrl = request.getScheme() + "://" + request.getServerName() + ":4200";

            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("support@demo.com");
            passwordResetEmail.setTo(optional.getEmail());
            passwordResetEmail.setSubject("Alteração de senha, Sistema Detrans");
            passwordResetEmail.setText("Caso você tenha solicitado a alteração de sua senha, favor clicar no link abaixo para efetuar a troca:\n" + appUrl
                    + "/reset?token=" + optional.getResetToken());

            emailService.sendEmail(passwordResetEmail);

            modelAndView.addObject("successMessage", "A password reset link has been sent to " + userEmail);

        return ResponseEntity.status(HttpStatus.OK).body("ENVIADO");

    }

    @RequestMapping(value = "/reset/{token}/{pass}", method = RequestMethod.GET)
    public  ResponseEntity<String> setNewPassword(ModelAndView modelAndView, @PathVariable Map<String, String> requestParams,
                                       @PathVariable String pass, RedirectAttributes redir) {

        User user = userDAO.findByResetToken(requestParams.get("token"));

        if (user.getId() != null) {

            User resetUser = user;

            resetUser.setPassword(bCryptPasswordEncoder.encode(pass));
            resetUser.setResetToken(null);

            userService.save(resetUser);


            return ResponseEntity.status(HttpStatus.OK).body("ENVIADO");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token Invalido");

        }
    }


    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ModelAndView handleMissingParams(MissingServletRequestParameterException ex) {
        return new ModelAndView("redirect:login");
    }
}