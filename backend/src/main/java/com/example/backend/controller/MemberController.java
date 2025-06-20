package com.example.backend.controller;

import com.example.backend.dto.ChangePasswordDTO;
import com.example.backend.dto.MemberDTO;
import com.example.backend.dto.MemberDetailsDTO;
import com.example.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseEntity<?> getMemberProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName(); // Get NIC from authenticated user

        return memberService.getMemberProfile(nic)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName(); // Get NIC from authenticated user

        boolean changed = memberService.changePassword(nic, dto.getOldPassword(), dto.getNewPassword());

        if (changed) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateLoggedInMember(@RequestBody MemberDTO memberDTO, Authentication authentication) {
        String nic = authentication.getName();
        try {
            MemberDTO updated = memberService.updateMember(nic, memberDTO);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
