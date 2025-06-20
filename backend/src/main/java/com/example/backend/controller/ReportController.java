package com.example.backend.controller;

import com.example.backend.dto.ReportDTO;
import com.example.backend.entity.Member;
import com.example.backend.entity.Report;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access from React dev server
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private MemberRepository memberRepository;

    //  Upload a report
    @PostMapping("/upload")
    public ResponseEntity<?> uploadReport(@RequestParam("file") MultipartFile file,
                                          @RequestParam("title") String title,
                                          Principal principal) {
        try {
            Member member = memberRepository.findByNic(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Member not found"));

            Report report = reportService.store(file, title, member);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    //  Get all reports for logged-in member
    @GetMapping("/myreports")
    public ResponseEntity<List<Report>> getMyReports(Principal principal) {
        Member member = memberRepository.findByNic(principal.getName())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        List<Report> reports = reportService.getReportsByMember(member);
        return ResponseEntity.ok(reports);
    }

    // Get all reports
    @GetMapping("/reports")
    public List<ReportDTO> getAllReports() {
        return reportService.getAllReports();
    }

    // Download a report file
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path file = reportService.load(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // View report in browser (PDF inline view)
    @GetMapping("/view/{filename:.+}")
    public ResponseEntity<Resource> viewFile(@PathVariable String filename) {
        try {
            Path file = reportService.load(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/update/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> updateReport(
            @PathVariable int id,
            @RequestPart("report") ReportDTO updatedReport,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            reportService.updateReport(id, updatedReport, file);
            return ResponseEntity.ok("Report updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed: " + e.getMessage());
        }
    }
}
