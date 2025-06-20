package com.example.backend.controller;

import com.example.backend.dto.AdminDTO;
import com.example.backend.entity.Member;
import com.example.backend.entity.Dependent;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AdminDTO adminDTO) {
        String result = adminService.registerAdmin(adminDTO);
        if (result.equals("Username already exists")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", result));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminDTO adminDTO) {
        String result = adminService.loginAdmin(adminDTO);
        if (result.equals("Login successful")) {
            return ResponseEntity.ok(Map.of("message", result));
        } else if (result.equals("Invalid credentials")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", result));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", result));
        }
    }

    @GetMapping("/members")
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = adminService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @GetMapping("/members/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable Integer id) {
        return adminService.getMemberById(id)
                .map(member -> ResponseEntity.ok(member))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Member) Map.of("message", "Member not found")));
    }

    @GetMapping("/members/{id}/dependents")
    public ResponseEntity<?> getDependentsByMemberId(@PathVariable Integer id) {
        Optional<Member> memberOpt = adminService.getMemberById(id);
        if (memberOpt.isPresent()) {
            List<Dependent> dependents = adminService.getDependentsByMember(memberOpt.get());
            return ResponseEntity.ok(dependents);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Member not found"));
        }
    }
}
