package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DependentDTO {
    private int did;
    private int memberId;
    private String name;
    private String nic;
    private LocalDate dob;
    private String gender;
    private String relationship;
}
