package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.Member;
import com.example.backend.entity.MemberDetails;
import com.example.backend.entity.Staff;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    @Autowired
    private MemberDetailsService memberDetailsService;

    @Autowired
    private DependentService dependentService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            StaffDTO registeredStaff = staffService.registerStaff(signupRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredStaff);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during signup: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getNic(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtService.generateToken(userDetails);

            Staff staff = staffService.findByNic(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Staff not found after authentication."));

            ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                    .httpOnly(true)
                    .secure(false) // Use true in production with HTTPS
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthResponse(jwt, staff.getFullName(), staff.getNic()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid NIC or password: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out successfully");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getStaffProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName(); // Get NIC from authenticated user

        return staffService.getStaffProfile(nic)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nic = authentication.getName(); // Get NIC from authenticated user

        boolean changed = staffService.changePassword(nic, dto.getOldPassword(), dto.getNewPassword());

        if (changed) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }
    }

    @GetMapping("/members")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody MemberDTO memberDTO) {
        try {
            Member member = new Member();
            member.setNic(memberDTO.getNic());
            member.setFullName(memberDTO.getFullName());
            member.setEmail(memberDTO.getEmail());
            member.setMobile(memberDTO.getMobile());
            member.setPassword(passwordEncoder.encode(memberDTO.getPassword()));

            memberRepository.save(member);
            return ResponseEntity.status(HttpStatus.CREATED).body("Member added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding member: " + e.getMessage());
        }
    }

    @PutMapping("/update-member/{id}")
    public ResponseEntity<?> updateMember(@PathVariable int id, @RequestBody MemberDTO memberDTO) {
        try {
            // Find existing member
            Member existingMember = memberRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Member not found with id " + id));

            // Update fields
            existingMember.setNic(memberDTO.getNic());
            existingMember.setFullName(memberDTO.getFullName());
            existingMember.setEmail(memberDTO.getEmail());
            existingMember.setMobile(memberDTO.getMobile());

            // Only update password if it is not empty/null
            if (memberDTO.getPassword() != null && !memberDTO.getPassword().trim().isEmpty()) {
                existingMember.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
            }

            memberRepository.save(existingMember);

            return ResponseEntity.ok("Member updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating member: " + e.getMessage());
        }
    }

    @GetMapping("/member-details/{memberId}")
    public ResponseEntity<MemberDetailsDTO> getMemberDetails(@PathVariable int memberId) {
        return memberDetailsService.getMemberDetailsByMemberId(memberId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dependents/{memberId}")
    public ResponseEntity<List<DependentDTO>> getDependentsByMemberId(@PathVariable int memberId) {
        List<DependentDTO> dependents = dependentService.getDependentsByMemberId(memberId);
        if (dependents.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dependents);
    }

    @PutMapping("/dependents/{id}")
    public ResponseEntity<?> updateDependent(
            @PathVariable int id,
            @RequestBody DependentDTO dependentDTO) {
        try {
            DependentDTO updated = dependentService.updateDependent(id, dependentDTO);
            return ResponseEntity.ok(Map.of("message", "Dependent updated successfully", "data", updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/dependents/{id}")
    public ResponseEntity<?> deleteDependent(@PathVariable int id) {
        try {
            dependentService.deleteDependent(id);
            return ResponseEntity.ok(Map.of("message", "Dependent deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }


}
