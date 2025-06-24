package com.example.backend.controller;

import com.example.backend.dto.DependentDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.DependentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dependents")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class DependentController {

    private final DependentService dependentService;

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getDependents(Authentication authentication) {
        try {
            String memberNic = authentication.getName();
            System.out.println("Logged in member NIC: " + memberNic);  // debug
            List<DependentDTO> list = dependentService.getDependentsByMemberNic(memberNic);
            return ResponseEntity.ok(new ResponseDTO("00", "Dependents retrieved successfully", list));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("99", e.getMessage(), null));
        }
    }


    @PostMapping("/add")
    public ResponseEntity<ResponseDTO> addDependent(
            @RequestBody DependentDTO dto, Authentication authentication) {
        try {
            String memberNic = authentication.getName();
            DependentDTO created = dependentService.addDependent(memberNic, dto);
            return ResponseEntity.ok(new ResponseDTO("00", "Dependent added successfully", created));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseDTO("01", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("99", "Failed to add dependent", null));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseDTO> updateDependent(
            @PathVariable("id") int id, @RequestBody DependentDTO dto, Authentication authentication) {
        try {
            String memberNic = authentication.getName();
            DependentDTO updated = dependentService.updateDependent(memberNic, id, dto);
            return ResponseEntity.ok(new ResponseDTO("00", "Dependent updated successfully", updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseDTO("01", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("99", "Failed to update dependent", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteDependent(
            @PathVariable("id") int id, Authentication authentication) {
        try {
            String memberNic = authentication.getName();
            dependentService.deleteDependent(memberNic, id);
            return ResponseEntity.ok(new ResponseDTO("00", "Dependent deleted successfully", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO("01", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("99", "Failed to delete dependent", null));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getDependentCount() {
        return ResponseEntity.ok(dependentService.getDependentCount());
    }

    @GetMapping("/dep-count")
    public ResponseEntity<Long> getDependentCountForLoggedInMember(@AuthenticationPrincipal UserDetails userDetails) {
        String memberNic = userDetails.getUsername(); // or custom claim
        long count = dependentService.getDependentCountByMemberNic(memberNic);
        return ResponseEntity.ok(count);
    }

}
