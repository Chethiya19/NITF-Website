package com.example.backend.repository;

import com.example.backend.entity.Member;
import com.example.backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    List<Report> findByMember(Member member);
    List<Report> findByMember_Nic(String nic);
    Optional<Report> findByMemberNic(String nic);

    long count();
    long countByMember(Member member);
}
