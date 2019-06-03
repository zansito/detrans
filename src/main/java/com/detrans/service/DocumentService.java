package com.detrans.service;

import com.detrans.model.Document;
import com.detrans.model.User;
import com.detrans.repository.DocumentRepository;

import com.detrans.repository.dao.DocumentDAO;
import com.detrans.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentDAO documentDAO;
    @Autowired
    private UserRepository userRepository;

    public Document createOrUpdate(Document document) {
        return documentRepository.save(document);
    }

    public List<Document> getDocumentById(Long id) {

        List<Document> documents = documentDAO.getDocuments(id);

        for (Document document : documents) {
           User user = setUserNameOnDocumentPayload(document.getCreatedBy());
           document.setCreatedByName(user.getName());
        }

        return documents;
    }


    public User setUserNameOnDocumentPayload(Long id) {
        return userRepository.getOne(id);
    }
    public void deleteDocumentById(Long id) {
        documentRepository.delete(id);
    }

}
