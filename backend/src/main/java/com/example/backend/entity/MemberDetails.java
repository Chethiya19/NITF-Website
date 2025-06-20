package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "member_details")
public class MemberDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "member_id", referencedColumnName = "mid")
    private Member member;

    private String initials;

    private LocalDate dob;

    private String accountNo;
    private String bank;
    private String branch;
    private String address;
    private String city;
    private String civilStatus;
}
