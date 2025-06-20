package com.example.backend.repository;

import com.example.backend.entity.Member;
import com.example.backend.entity.MemberDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberDetailsRepository extends JpaRepository<MemberDetails, Integer> {
    Optional<MemberDetails> findByMember_Nic(String nic);
    Optional<MemberDetails> findByMember_Mid(int mid);
    Optional<MemberDetails> findByMember(Member member);
    MemberDetails findByMemberMid(int memberId);
}
