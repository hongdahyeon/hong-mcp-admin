package io.hong.admin.domain.user.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.enumcd.UserRole;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.domain.user.dto.request.UserSaveRequest;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
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
    public HUser saveUser(UserSaveRequest dto) {
        try {
            // 중복 검증 한 번 더 수행
            if (checkEmailDuplicate(dto.email())) throw new HongException(HongErrorCode.USER_ID_DUPLICATE);
            if (checkUsernameDuplicate(dto.username())) throw new HongException(HongErrorCode.USER_NAME_DUPLICATE);

            HUser user = HUser.builder()
                    .email(dto.email())
                    .username(dto.username())
                    .password(passwordEncoder.encode(dto.password())) // 암호화
                    .role(UserRole.valueOf(dto.role()))
                    .isApproved(true) // 일단 테스트를 위해 true (나중에 관리자 승인 로직 추가 시 수정)
                    .isEnabled(true)
                    .build();

            Long userId = userRepository.save(user).getId();

            return userRepository.getHUserById(userId);

        } catch (HongException e) {
            return null;
        }
    }
}
