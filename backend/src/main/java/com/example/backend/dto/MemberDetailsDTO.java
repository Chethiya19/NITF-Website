package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberDetailsDTO {
    private int id;
    private int memberId;

    private String initials;
    private LocalDate dob;
    private String accountNo;
    private String bank;
    private String branch;
    private String address;
    private String city;
    private String civilStatus;
}
