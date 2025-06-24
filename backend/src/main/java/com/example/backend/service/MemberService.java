package com.example.backend.service;

import com.example.backend.dto.MemberDTO;
import com.example.backend.dto.SignupRequest;
import com.example.backend.entity.Member;
import com.example.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<Member> findByNic(String nic) {
        return memberRepository.findByNic(nic);
    }

    public MemberDTO registerMember(SignupRequest signupRequest) {
        if (memberRepository.existsByNic(signupRequest.getNic())) {
            throw new IllegalArgumentException("NIC already registered.");
        }
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email already registered.");
        }

        Member member = new Member();
        member.setNic(signupRequest.getNic());
        member.setFullName(signupRequest.getFullName());
        member.setEmail(signupRequest.getEmail());
        member.setMobile(signupRequest.getMobile());
        member.setPassword(passwordEncoder.encode(signupRequest.getPassword())); // Hash the password

        Member savedMember = memberRepository.save(member);
        return convertToDTO(savedMember);
    }

    public Optional<MemberDTO> getMemberProfile(String nic) {
        return memberRepository.findByNic(nic)
                .map(this::convertToDTO);
    }

    //  New method to change password
    public boolean changePassword(String nic, String oldPassword, String newPassword) {
        Optional<Member> optionalMember = memberRepository.findByNic(nic);
        if (optionalMember.isEmpty()) return false;

        Member member = optionalMember.get();

        if (!passwordEncoder.matches(oldPassword, member.getPassword())) {
            return false; // old password does not match
        }

        member.setPassword(passwordEncoder.encode(newPassword)); // encode and update new password
        memberRepository.save(member);
        return true;
    }

    private MemberDTO convertToDTO(Member member) {
        MemberDTO dto = new MemberDTO();
        dto.setMID(member.getMid());
        dto.setNic(member.getNic());
        dto.setFullName(member.getFullName());
        dto.setEmail(member.getEmail());
        dto.setMobile(member.getMobile());
        return dto;
    }

    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll().stream().map(member -> {
            MemberDTO dto = new MemberDTO();
            dto.setMID(member.getMid());
            dto.setNic(member.getNic());
            dto.setFullName(member.getFullName());
            dto.setEmail(member.getEmail());
            dto.setMobile(member.getMobile());
            return dto;
        }).collect(Collectors.toList());
    }

    public MemberDTO updateMember(String nic, MemberDTO memberDTO) throws IllegalArgumentException {
        Member member = memberRepository.findByNic(nic)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        if (!member.getEmail().equals(memberDTO.getEmail()) && memberRepository.existsByEmail(memberDTO.getEmail())) {
            throw new IllegalArgumentException("Email already in use by another member");
        }

        member.setFullName(memberDTO.getFullName());
        member.setEmail(memberDTO.getEmail());
        member.setMobile(memberDTO.getMobile());

        if (memberDTO.getPassword() != null && !memberDTO.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        }

        Member updated = memberRepository.save(member);
        return convertToDTO(updated);
    }

    public long getMemberCount() {
        return memberRepository.count();
    }

}
