package com.example.backend.repository;

import com.example.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<Staff> findByNic(String nic);
    boolean existsByNic(String nic);
    boolean existsByEmail(String email);
}