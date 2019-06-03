package com.detrans.service;

import com.detrans.model.*;
import com.detrans.repository.AccreditedRepository;
import com.detrans.repository.CredentialRepository;
import com.detrans.repository.dao.CredentialDAO;
import com.itextpdf.io.font.FontConstants;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.VerticalAlignment;
import com.itextpdf.test.annotations.WrapToTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@WrapToTest
@Service
@PreAuthorize("hasRole('ADMIN')")
public class CredentialService {

    @Autowired
    private AccreditedRepository accreditedRepository;
    @Autowired
    private CredentialRepository credentialRepository;
    @Autowired
    private CredentialDAO credentialDAO;

    public void save(Credential credential) {
        try {
            Credential cred = manipulatePdf(credential);
            persist(cred);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Credential> get(Long id) {
        return credentialDAO.getCredentialByUser(id);
    }

    public Credential manipulatePdf(Credential credential) throws Exception{
        try {
            String src = "";
            if (credential != null && credential.getAccredited().getTypeEnum().equals(CredentialTypeEnum.IDOSO)) {
                src = "C:/Santiago/detrans/idoso.pdf";
            } else {
                src = "C:/Santiago/detrans/deficiente.pdf";
            }

            Long accreditedId = credential.getAccredited().getId();
            String dest = "C:/Santiago/detrans/" + accreditedId + ".pdf";

            boolean alreadyHas = accreditedHasCredential(credential);

            if (credential != null && credential.getAccredited().getTypeEnum().equals(CredentialTypeEnum.IDOSO)) {
                credential = handleElderCredential(credential, src, dest);
            } else {
                credential = handleAbstractCredential(credential, src, dest);
            }

            return credential;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Credential handleElderCredential(Credential credential, String src, String dest) throws IOException {

        File file = new File(dest);
        file.getParentFile().mkdirs();
        PdfDocument pdfDoc = new PdfDocument(new PdfReader(src), new PdfWriter(dest));
        Document document = new Document(pdfDoc);
        Rectangle pageSize;
        PdfCanvas canvas;
        int n = pdfDoc.getNumberOfPages();

        Long accreditedId = credential.getAccredited().getId();

        for (int i = 1; i <= n; i++) {
            PdfPage page = pdfDoc.getPage(i);
            pageSize = page.getPageSize();
            canvas = new PdfCanvas(page);
            Paragraph preface = new Paragraph();
            double x = 0;
            double y = 0;

            new Canvas(canvas.beginText()
                    .setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD),
                            15), pdfDoc, page.getPageSize())
                    .showTextAligned(credential.getDocumentNumber(),
                            362, 445, TextAlignment.CENTER, VerticalAlignment.TOP, 22);


            if (credential.getAccredited().getName().length() >= 26) {
                    x = 190;
                    y = 170;
            } else {
                x = 190;
                y = 220 ;
            }
            canvas.beginText()
                    .setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(150, 165)
                    .showText(formatDate(credential.getExpireDate()))
                    .endText();

            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 20)
                    .moveText(y, x)
                    .showText(credential.getAccredited().getName())
                    .endText();


            canvas.beginText()
                    .setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(206, 82)
                    .showText(formatDate(credential.getEmissionDate()))
                    .endText();

            canvas.beginText()
                    .setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(360, 226)
                    .showText(credential.getRegister())
                    .endText();

        }

        credential.setFileName(accreditedId.toString() + ".pdf");
        pdfDoc.close();
        return credential;
    }

    public Credential handleAbstractCredential(Credential credential, String src, String dest) throws IOException {
        Long accreditedId = credential.getAccredited().getId();

        File file = new File(dest);
        file.getParentFile().mkdirs();
        PdfDocument pdfDoc = new PdfDocument(new PdfReader(src), new PdfWriter(dest));
        Document document = new Document(pdfDoc);
        Rectangle pageSize;
        PdfCanvas canvas;
        int n = pdfDoc.getNumberOfPages();
        double x = 220;
        double y = 600;


        if (credential.getAccredited().getName().length() >= 26) {
            x = 200;
            y = 600;
        }

        for (int i = 1; i <= n; i++) {
            PdfPage page = pdfDoc.getPage(i);
            pageSize = page.getPageSize();
            canvas = new PdfCanvas(page);


            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(173, 358)
                    .showText(credential.getDocumentNumber())
                    .endText();

            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 20)
                    .moveText(x, y)
                    .showText(credential.getAccredited().getName())
                    .endText();

            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(370, 635)
                    .showText(credential.getNumber())
                    .endText();

            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(215, 493)
                    .showText(formatDate(credential.getEmissionDate()))
                    .endText();

            canvas.beginText().setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD), 15)
                    .moveText(170, 575)
                    .showText(formatDate(credential.getExpireDate()))
                    .endText();

        }

        credential.setFileName(accreditedId.toString() + ".pdf");
        pdfDoc.close();
        return credential;
    }

    public String formatDate(Date date) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String strDate = df.format(date);
        return strDate;
    }

    public Credential persist(Credential credential) {
        Accredited accredited = accreditedRepository.findOne(credential.getAccredited().getId());
        credential.setAccredited(accredited);
        credentialRepository.save(credential);
        return credential;
    }

    public void delete(Long id) {
        credentialDAO.deleteCredential(id);
        deletePdf(id);
    }

    public boolean deletePdf(Long id) {
        try {
            Path fileToDeletePath = Paths.get("src/main/webapp/WEB-INF/pdf/" + id + ".pdf");
            Files.delete(fileToDeletePath);
            return true;
        } catch (IOException io) {
            return false;
        }
    }

    public boolean accreditedHasCredential(Credential credential) {
        boolean res = credentialDAO.accreditedHasCredential(credential);
        return res;
    }

    public List<CredentialHistoryVO> getHistoryById(Long id, String pattern, String filterBy,
                                                    String searchBy, int page, int pageSize) {
        List<CredentialHistoryVO> lizt = credentialDAO.getCredentialHistoryById(id, pattern, filterBy, searchBy, page, pageSize);
        return lizt;
    }

    public CredentialHistoryVO getHistoryDetailById(Long id) {
        return credentialDAO.getHistoryDetailById(id);
    }
}
