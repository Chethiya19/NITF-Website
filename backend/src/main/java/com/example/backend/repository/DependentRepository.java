package com.example.backend.repository;

import com.example.backend.entity.Dependent;
import com.example.backend.entity.Member;
import com.example.backend.entity.MemberDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DependentRepository extends JpaRepository<Dependent, Integer> {
    Optional<Dependent> findByNic(String nic);

    Optional<Dependent> findByMemberAndNic(Member member, String nic);

    List<Dependent> findByMember(Member member);

    Optional<Dependent> findByMember_Mid(int mid);

}