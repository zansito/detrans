package com.detrans.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@Service
public class StorageService {

    Logger log = LoggerFactory.getLogger(this.getClass().getName());
    private final Path rootLocation = Paths.get("upload-dir");
    private final Path finalLocation = Paths.get("upload");

    public void init() {
        try {

            //  if its a new instalation please uncomment
            // this guy here and remove that if, and in Application file for creation phase! :)
            // and then comment again after first application deploy
            if(Files.exists(rootLocation)) {
                System.out.println("Root exists!");
            } else {
                Files.createDirectory(rootLocation);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }

    public void store(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));

            //Depois passar uma resposta de usuário salvo para remover do upload dir
            Files.copy(file.getInputStream(), this.finalLocation.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

//    public void deleteAll() {
//        FileSystemUtils.deleteRecursively(rootLocation.toFile());
//    }

    @Transactional
    public void deleteFile(String fileName) throws IOException {

        Path path = Paths.get(rootLocation + "/" + fileName);
        Path backpath = Paths.get(finalLocation + "/" + fileName);
        Files.delete(path);
        Files.delete(backpath);
    }

}