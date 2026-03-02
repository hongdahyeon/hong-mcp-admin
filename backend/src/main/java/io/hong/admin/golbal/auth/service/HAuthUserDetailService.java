package io.hong.admin.golbal.auth.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.golbal.auth.HAuthUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.golbal.auth.service
 * fileName       : HAuthUserDetailService
 * author         : note
 * date           : 2026-03-03
 * description    : Spring Security UserDetailsService 구현체
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Service
@RequiredArgsConstructor
public class HAuthUserDetailService implements UserDetailsService {

    private final HUserRepository hUserRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. DB >> 이메일로 유저 찾기
        HUser hUser = hUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 유저가 없습니다: " + email));
        return HAuthUserDetail.from(hUser);
    }
}
