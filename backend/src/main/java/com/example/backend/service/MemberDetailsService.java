package com.example.backend.service;

import com.example.backend.dto.MemberDetailsDTO;
import com.example.backend.entity.Member;
import com.example.backend.entity.MemberDetails;
import com.example.backend.repository.MemberDetailsRepository;
import com.example.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberDetailsService {

    private final MemberDetailsRepository memberDetailsRepository;
    private final MemberRepository memberRepository;

    public Optional<MemberDetailsDTO> getMemberProfile(String nic) {
        return memberDetailsRepository.findByMember_Nic(nic)
                .map(this::convertToDTO);
    }

    public Optional<MemberDetailsDTO> getMemberDetailsByMemberId(int memberId) {
        return memberDetailsRepository.findByMember_Mid(memberId)
                .map(this::convertToDTO);
    }

    public MemberDetailsDTO addMemberDetails(String nic, MemberDetailsDTO dto) {
        Member member = memberRepository.findByNic(nic)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Check if details already exist for this member
        Optional<MemberDetails> existingDetails = memberDetailsRepository.findByMember_Nic(nic);
        if (existingDetails.isPresent()) {
            throw new RuntimeException("Details already exist for this member");
        }

        MemberDetails details = new MemberDetails();
        details.setMember(member);
        updateEntityFromDTO(dto, details);

        MemberDetails saved = memberDetailsRepository.save(details);
        return convertToDTO(saved);
    }

    public MemberDetailsDTO updateMemberDetails(String nic, MemberDetailsDTO dto) {
        MemberDetails existing = memberDetailsRepository.findByMember_Nic(nic)
                .orElseThrow(() -> new RuntimeException("MemberDetails not found"));

        updateEntityFromDTO(dto, existing);

        MemberDetails saved = memberDetailsRepository.save(existing);
        return convertToDTO(saved);
    }

    private void updateEntityFromDTO(MemberDetailsDTO dto, MemberDetails entity) {
        entity.setInitials(dto.getInitials());
        entity.setDob(dto.getDob());
        entity.setAccountNo(dto.getAccountNo());
        entity.setBank(dto.getBank());
        entity.setBranch(dto.getBranch());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setCivilStatus(dto.getCivilStatus());
    }

    private MemberDetailsDTO convertToDTO(MemberDetails details) {
        MemberDetailsDTO dto = new MemberDetailsDTO();
        dto.setId(details.getId());
        dto.setMemberId(details.getMember().getMid());
        dto.setInitials(details.getInitials());
        dto.setDob(details.getDob());
        dto.setAccountNo(details.getAccountNo());
        dto.setBank(details.getBank());
        dto.setBranch(details.getBranch());
        dto.setAddress(details.getAddress());
        dto.setCity(details.getCity());
        dto.setCivilStatus(details.getCivilStatus());
        return dto;
    }
}
