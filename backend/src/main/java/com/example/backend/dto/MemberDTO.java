package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private int mID;
    private String nic;
    private String fullName;
    private String email;
    private String mobile;
    private String password;
}