package com.example.backend.service;

import com.example.backend.dto.InstituteDTO;
import com.example.backend.entity.Institute;
import com.example.backend.repository.InstituteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InstituteService {

    @Autowired
    private InstituteRepository instituteRepository;

    public InstituteDTO addInstitute(InstituteDTO dto) {
        Institute institute = new Institute();
        institute.setName(dto.getName());
        institute.setAddress(dto.getAddress());
        institute.setContact(dto.getContact());

        Institute saved = instituteRepository.save(institute);

        InstituteDTO response = new InstituteDTO();
        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setAddress(saved.getAddress());
        response.setContact(saved.getContact());

        return response;
    }

    public List<InstituteDTO> getAllInstitutes() {
        return instituteRepository.findAll().stream().map(institute -> {
            InstituteDTO dto = new InstituteDTO();
            dto.setId(institute.getId());
            dto.setName(institute.getName());
            dto.setAddress(institute.getAddress());
            dto.setContact(institute.getContact());
            return dto;
        }).collect(Collectors.toList());
    }

    public InstituteDTO updateInstitute(int id, InstituteDTO dto) {
        Optional<Institute> optionalInstitute = instituteRepository.findById(id);

        if (optionalInstitute.isPresent()) {
            Institute institute = optionalInstitute.get();
            institute.setName(dto.getName());
            institute.setAddress(dto.getAddress());
            institute.setContact(dto.getContact());

            Institute updated = instituteRepository.save(institute);

            InstituteDTO response = new InstituteDTO();
            response.setId(updated.getId());
            response.setName(updated.getName());
            response.setAddress(updated.getAddress());
            response.setContact(updated.getContact());

            return response;
        } else {
            throw new RuntimeException("Institute not found with ID: " + id);
        }
    }

    public void deleteInstitute(int id) {
        if (instituteRepository.existsById(id)) {
            instituteRepository.deleteById(id);
        } else {
            throw new RuntimeException("Institute not found with ID: " + id);
        }
    }
}
