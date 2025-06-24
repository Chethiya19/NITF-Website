package com.example.backend.controller;

import com.example.backend.dto.InstituteDTO;
import com.example.backend.service.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institute")
@CrossOrigin(origins = "*")
public class InstituteController {

    @Autowired
    private InstituteService instituteService;

    @PostMapping("/add")
    public InstituteDTO addInstitute(@RequestBody InstituteDTO dto) {
        return instituteService.addInstitute(dto);
    }

    @GetMapping("/list")
    public List<InstituteDTO> getAllInstitutes() {
        return instituteService.getAllInstitutes();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InstituteDTO> updateInstitute(@PathVariable int id, @RequestBody InstituteDTO dto) {
        InstituteDTO updated = instituteService.updateInstitute(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteInstitute(@PathVariable int id) {
        instituteService.deleteInstitute(id);
        return ResponseEntity.ok("Institute deleted successfully.");
    }
}
