package com.example.backend.dto;

import lombok.*;

@Data
public class ReportDTO {
    private int id;
    private String fileName;
    private String title;
    private int memberId;
    private String memberNic;
    private String memberFullName;

    public ReportDTO() {}

    public ReportDTO(int id, String fileName, String title, int memberId, String memberNic, String memberFullName) {
        this.id = id;
        this.fileName = fileName;
        this.title = title;
        this.memberId = memberId;
        this.memberNic = memberNic;
        this.memberFullName = memberFullName;
    }
}
