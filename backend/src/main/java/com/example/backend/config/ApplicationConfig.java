package com.example.backend.config;

import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final MemberRepository memberRepository;
    private final StaffRepository staffRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // Try to find member by NIC
            return memberRepository.findByNic(username)
                    .map(member -> org.springframework.security.core.userdetails.User.builder()
                            .username(member.getNic())
                            .password(member.getPassword())
                            .roles("MEMBER")  // Role MEMBER for members
                            .build())
                    .or(() ->
                            // If not found in members, try staff
                            staffRepository.findByNic(username)
                                    .map(staff -> org.springframework.security.core.userdetails.User.builder()
                                            .username(staff.getNic())
                                            .password(staff.getPassword())
                                            .roles("STAFF")  // Role STAFF for staff
                                            .build())
                    )
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with NIC: " + username));
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}