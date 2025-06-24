package com.example.backend.service;

import com.example.backend.dto.GarageDTO;
import com.example.backend.entity.Garage;
import com.example.backend.repository.GarageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GarageService {

    @Autowired
    private GarageRepository garageRepository;

    public GarageDTO addGarage(GarageDTO dto) {
        Garage garage = new Garage();
        garage.setName(dto.getName());
        garage.setAddress(dto.getAddress());

        Garage saved = garageRepository.save(garage);

        GarageDTO response = new GarageDTO();
        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setAddress(saved.getAddress());

        return response;
    }

    public List<GarageDTO> getAllGarages() {
        return garageRepository.findAll().stream().map(garage -> {
            GarageDTO dto = new GarageDTO();
            dto.setId(garage.getId());
            dto.setName(garage.getName());
            dto.setAddress(garage.getAddress());
            return dto;
        }).collect(Collectors.toList());
    }
}
