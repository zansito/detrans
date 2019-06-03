package com.detrans.resource;

import com.detrans.model.Accredited;
import com.detrans.model.Credential;
import com.detrans.model.CredentialHistoryVO;
import com.detrans.model.HistoryVO;
import com.detrans.service.CredentialService;
import com.detrans.service.StorageService;
import org.omg.PortableInterceptor.SUCCESSFUL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.concurrent.SuccessCallback;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("${permited-origin}")
@RequestMapping("/credential")
@PreAuthorize("hasRole('ADMIN')")
public class CredentialResource {

    @Autowired
    private CredentialService credentialService;
    @Autowired
    private StorageService storageService;


    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody Credential credential) {
        try {
            credentialService.save(credential);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<Credential> get(@PathVariable("id") Long id) {
        try {
            return credentialService.get(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/download/{fileName:.+}", method = RequestMethod.GET)
    public void downloadPDFResource(HttpServletRequest request,
                                    HttpServletResponse response,
                                    @PathVariable("fileName") String fileName) {
        response.setContentType("application/force-download");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.addHeader("Content-Disposition", "attachment; filename=" + fileName);


        String dataDirectory = request.getServletContext().getRealPath("/WEB-INF/pdf/");
        Path file = Paths.get(dataDirectory, fileName);
        if (Files.exists(file)) {

            try {
                Files.copy(file, response.getOutputStream());
                response.getOutputStream().flush();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteCredential(@PathVariable("id") Long id) {
        try{
            credentialService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("history/{id}")
    public List<CredentialHistoryVO> getHistoryById(@PathVariable("id") Long id, String pattern, String filterBy, String searchBy,
                                                    int page, int pageSize) {
        return credentialService.getHistoryById(id, pattern, filterBy, searchBy, page, pageSize);
    }

    @GetMapping("detail/{id}")
    public CredentialHistoryVO getHistoryDetailById(@PathVariable("id") Long id) {
        return credentialService.getHistoryDetailById(id);
    }
}


