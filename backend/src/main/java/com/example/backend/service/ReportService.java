package com.example.backend.service;

import com.example.backend.dto.ReportDTO;
import com.example.backend.entity.Member;
import com.example.backend.entity.Report;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final Path rootLocation = Paths.get("reports");

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository, MemberRepository memberRepository) {
        this.reportRepository = reportRepository;
        this.memberRepository = memberRepository;
    }

    public Report store(MultipartFile file, String title, Member member) throws IOException {
        // Ensure the reports directory exists
        Files.createDirectories(rootLocation);

        // Normalize and resolve destination path
        Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                .normalize().toAbsolutePath();

        // Save file on disk
        file.transferTo(destinationFile);

        // Create and save the report entity
        Report report = new Report();
        report.setFileName(file.getOriginalFilename());
        report.setTitle(title);
        report.setMember(member);
        return reportRepository.save(report);
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public List<Report> getReportsByMember(Member member) {
        return reportRepository.findByMember(member);
    }

    public List<ReportDTO> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        return reports.stream()
                .map(report -> new ReportDTO(
                        report.getId(),
                        report.getFileName(),
                        report.getTitle(),
                        report.getMember().getMid(),
                        report.getMember().getNic(),
                        report.getMember().getFullName()
                ))
                .collect(Collectors.toList());
    }

    public void updateReport(int id, ReportDTO updatedReport, MultipartFile file) throws IOException {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setTitle(updatedReport.getTitle());

        if (file != null && !file.isEmpty()) {
            Files.createDirectories(rootLocation);
            Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            file.transferTo(destinationFile);

            report.setFileName(file.getOriginalFilename());
        }

        reportRepository.save(report);
    }

    public long getReportCount() {
        return reportRepository.count();
    }

    public long getReportCountByMemberNic(String memberNic) {
        Member member = memberRepository.findByNic(memberNic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        return reportRepository.countByMember(member);
    }
}
