package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dependents", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"member_id", "nic"})
})
public class Dependent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, referencedColumnName = "mid")
    private Member member;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nic;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String relationship;
}
