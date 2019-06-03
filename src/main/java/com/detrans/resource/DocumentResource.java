package com.detrans.resource;


import com.detrans.model.Document;
import com.detrans.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("${permited-origin}")
@RequestMapping("/document")
public class DocumentResource {

    @Autowired
    private DocumentService documentService;

    @RequestMapping(method = RequestMethod.POST)
    public Document create(@RequestBody @Valid Document document) {
        return documentService.createOrUpdate(document);
    }

    @GetMapping("/{id}")
    public List<Document> get(@PathVariable("id") Long id) { return documentService.getDocumentById(id); }

    @DeleteMapping("/delete/{id}")
    public void deleteDocument (@PathVariable("id") Long id) {
        documentService.deleteDocumentById(id);
    }

}
