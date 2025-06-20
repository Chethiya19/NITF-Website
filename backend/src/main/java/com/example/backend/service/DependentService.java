package com.example.backend.service;

import com.example.backend.dto.DependentDTO;
import com.example.backend.entity.Dependent;
import com.example.backend.entity.Member;
import com.example.backend.repository.DependentRepository;
import com.example.backend.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DependentService {
    private final MemberRepository memberRepository;
    private final DependentRepository dependentRepository;

    public DependentDTO addDependent(String memberNic, DependentDTO dto) {
        Member member = memberRepository.findByNic(memberNic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        dependentRepository.findByMemberAndNic(member, dto.getNic())
                .ifPresent(d -> {
                    throw new IllegalArgumentException("Dependent with NIC " + dto.getNic() + " already exists for this member");
                });

        Dependent dep = new Dependent();
        dep.setMember(member);
        updateEntityFromDTO(dto, dep);
        return convertToDTO(dependentRepository.save(dep));
    }

    public List<DependentDTO> getDependentsByMemberNic(String memberNic) {
        Member member = memberRepository.findByNic(memberNic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        return dependentRepository.findByMember(member)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DependentDTO> getDependentsByMemberId(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        return dependentRepository.findByMember(member)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DependentDTO> getAllDependents() {
        return dependentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DependentDTO updateDependent(String memberNic, int dependentId, DependentDTO dto) {
        Member member = memberRepository.findByNic(memberNic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        Dependent dep = dependentRepository.findById(dependentId)
                .orElseThrow(() -> new IllegalArgumentException("Dependent not found"));

        if (!Objects.equals(dep.getMember().getMid(), member.getMid())) {
            throw new IllegalArgumentException("Unauthorized to update dependent of another member");
        }

        dependentRepository.findByMemberAndNic(member, dto.getNic())
                .ifPresent(existing -> {
                    if (!Objects.equals(existing.getDid(), dependentId)) {
                        throw new IllegalArgumentException("Another dependent with NIC " + dto.getNic() + " already exists for this member");
                    }
                });

        updateEntityFromDTO(dto, dep);
        return convertToDTO(dependentRepository.save(dep));
    }

    public void deleteDependent(String memberNic, int dependentId) {
        Member member = memberRepository.findByNic(memberNic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        Dependent dep = dependentRepository.findById(dependentId)
                .orElseThrow(() -> new IllegalArgumentException("Dependent not found"));

        if (!Objects.equals(dep.getMember().getMid(), member.getMid())) {
            throw new IllegalArgumentException("Unauthorized to delete dependent of another member");
        }

        dependentRepository.delete(dep);
    }

    public DependentDTO updateDependent(int dependentId, DependentDTO updatedDTO) {
        Dependent dependent = dependentRepository.findById(dependentId)
                .orElseThrow(() -> new IllegalArgumentException("Dependent not found"));

        dependent.setName(updatedDTO.getName());
        dependent.setNic(updatedDTO.getNic());
        dependent.setRelationship(updatedDTO.getRelationship());
        dependent.setDob(updatedDTO.getDob());
        dependent.setGender(updatedDTO.getGender());

        Dependent updated = dependentRepository.save(dependent);
        return convertToDTO(updated);
    }
    public void deleteDependent(int dependentId) {
        if (!dependentRepository.existsById(dependentId)) {
            throw new IllegalArgumentException("Dependent not found");
        }
        dependentRepository.deleteById(dependentId);
    }

    private void updateEntityFromDTO(DependentDTO dto, Dependent entity) {
        entity.setName(dto.getName());
        entity.setNic(dto.getNic());
        entity.setDob(dto.getDob());
        entity.setGender(dto.getGender());
        entity.setRelationship(dto.getRelationship());
    }

    private DependentDTO convertToDTO(Dependent entity) {
        DependentDTO dto = new DependentDTO();
        dto.setDid(entity.getDid());
        dto.setMemberId(entity.getMember().getMid());
        dto.setName(entity.getName());
        dto.setNic(entity.getNic());
        dto.setDob(entity.getDob());
        dto.setGender(entity.getGender());
        dto.setRelationship(entity.getRelationship());
        return dto;
    }
}
