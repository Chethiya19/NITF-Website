package com.example.backend.service;

import com.example.backend.dto.AdminDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.Member;
import com.example.backend.entity.Dependent;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.DependentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DependentRepository dependentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerAdmin(AdminDTO adminDTO) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(adminDTO.getUsername());
        if (existingAdmin.isPresent()) {
            return "Username already exists";
        }

        Admin newAdmin = new Admin();
        newAdmin.setUsername(adminDTO.getUsername());
        newAdmin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
        adminRepository.save(newAdmin);
        return "Admin registered successfully";
    }

    public String loginAdmin(AdminDTO adminDTO) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(adminDTO.getUsername());
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (passwordEncoder.matches(adminDTO.getPassword(), admin.getPassword())) {
                return "Login successful";
            } else {
                return "Invalid credentials";
            }
        }
        return "User not found";
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(Integer id) {
        return memberRepository.findById(id);
    }

    public List<Dependent> getDependentsByMember(Member member) {
        return dependentRepository.findByMember(member);
    }
}
