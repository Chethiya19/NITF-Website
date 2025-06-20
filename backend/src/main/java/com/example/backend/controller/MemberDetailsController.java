package com.example.backend.controller;

import com.example.backend.dto.MemberDetailsDTO;
import com.example.backend.service.MemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member-details")
@RequiredArgsConstructor
public class MemberDetailsController {

    private final MemberDetailsService memberDetailsService;

    @GetMapping("/profile")
    public ResponseEntity<?> getMemberProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName();

        return memberDetailsService.getMemberProfile(nic)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMemberDetails(@RequestBody MemberDetailsDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName();

        try {
            MemberDetailsDTO saved = memberDetailsService.addMemberDetails(nic, dto);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMemberDetails(@RequestBody MemberDetailsDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName();

        try {
            MemberDetailsDTO updated = memberDetailsService.updateMemberDetails(nic, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
