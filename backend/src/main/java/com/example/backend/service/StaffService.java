package com.example.backend.service;

import com.example.backend.dto.StaffDTO;
import com.example.backend.dto.SignupRequest;
import com.example.backend.entity.Staff;
import com.example.backend.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<Staff> findByNic(String nic) {
        return staffRepository.findByNic(nic);
    }

    public StaffDTO registerStaff(SignupRequest signupRequest) {
        if (staffRepository.existsByNic(signupRequest.getNic())) {
            throw new IllegalArgumentException("NIC already registered.");
        }
        if (staffRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email already registered.");
        }

        Staff staff = new Staff();
        staff.setNic(signupRequest.getNic());
        staff.setFullName(signupRequest.getFullName());
        staff.setEmail(signupRequest.getEmail());
        staff.setMobile(signupRequest.getMobile());
        staff.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // hash password

        Staff savedStaff = staffRepository.save(staff);
        return convertToDTO(savedStaff);
    }

    public Optional<StaffDTO> getStaffProfile(String nic) {
        return staffRepository.findByNic(nic)
                .map(this::convertToDTO);
    }

    public boolean changePassword(String nic, String oldPassword, String newPassword) {
        Optional<Staff> optionalStaff = staffRepository.findByNic(nic);
        if (optionalStaff.isEmpty()) return false;

        Staff staff = optionalStaff.get();

        if (!passwordEncoder.matches(oldPassword, staff.getPassword())) {
            return false;
        }

        staff.setPassword(passwordEncoder.encode(newPassword));
        staffRepository.save(staff);
        return true;
    }

    private StaffDTO convertToDTO(Staff staff) {
        StaffDTO dto = new StaffDTO();
        dto.setSID(staff.getSid());
        dto.setNic(staff.getNic());
        dto.setFullName(staff.getFullName());
        dto.setEmail(staff.getEmail());
        dto.setMobile(staff.getMobile());
        return dto;
    }
}
