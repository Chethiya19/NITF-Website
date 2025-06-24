package com.example.backend.controller;

import com.example.backend.dto.GarageDTO;
import com.example.backend.service.GarageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garages")
@CrossOrigin(origins = "*")
public class GarageController {

    @Autowired
    private GarageService garageService;

    @PostMapping("/add")
    public GarageDTO addGarage(@RequestBody GarageDTO dto) {
        return garageService.addGarage(dto);
    }

    @GetMapping("/list")
    public List<GarageDTO> getAllGarages() {
        return garageService.getAllGarages();
    }
}
