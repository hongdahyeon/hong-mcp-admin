package io.hong.admin.domain.user.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.enumcd.UserRole;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.domain.user.dto.request.UserSaveRequest;
import io.hong.admin.golbal.exception.HongException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.user.service
 * fileName       : HUserService
 * author         : home
 * date           : 2026-03-03
 * description    : HUserService Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HUserService {

    private final HUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 1. 이메일 중복 체크
    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    // 2. Username 중복 체크
    public boolean checkUsernameDuplicate(String username) {
        return userRepository.existsByUsername(username);
    }

    // 3. 유저 저장
    @Transactional
    public Long saveUser(UserSaveRequest dto) {
        try {
            // 중복 검증 한 번 더 수행
            if (checkEmailDuplicate(dto.email())) throw new HongException("이미 존재하는 이메일입니다.");
            if (checkUsernameDuplicate(dto.username())) throw new HongException("이미 존재하는 이름입니다.");

            HUser user = HUser.builder()
                    .email(dto.email())
                    .username(dto.username())
                    .password(passwordEncoder.encode(dto.password())) // 암호화
                    .role(UserRole.valueOf(dto.role()))
                    .isApproved(true) // 일단 테스트를 위해 true (나중에 관리자 승인 로직 추가 시 수정)
                    .isEnabled(true)
                    .build();

            return userRepository.save(user).getId();

        } catch (HongException e) {
            return null;
        }
    }
}
