package com.example.backend.repository;

import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByNic(String nic);
    boolean existsByNic(String nic);
    boolean existsByEmail(String email);

    long count();
}