package io.hong.admin.golbal.auth.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.domain.usertoken.service.HUserTokenService;
import io.hong.admin.golbal.auth.dto.request.LoginRequest;
import io.hong.admin.golbal.auth.dto.response.TokenResponse;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.golbal.auth.service
 * fileName       : AuthService
 * author         : note
 * date           : 2026-03-03
 * description    : AuthService Class
 *                  => {BCrypt}로 비밀번호를 검사하고,
 *                     성공하면 유저의 모든 상태값을 토큰에 담아 발행
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Service
@RequiredArgsConstructor
public class AuthService {

    private final HUserRepository userRepository;
    private final HUserTokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest request) throws HongException {

        // 1. 유저 조회
        HUser hUser = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new HongException("존재하지 않는 사용자입니다."));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(request.password(), hUser.getPassword())) {
            throw new HongException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 계정 상태 체크 (시큐리티가 해주기도 하지만 여기서 미리 확인 가능)
        if (hUser.isDeleted()) throw new HongException("탈퇴한 계정입니다.");

        // 4. 토큰 발행 (HUser 정보를 Claims에 가득 담아 보냄)
        String accessToken = jwtProvider.createAccessToken(hUser);
        String refreshToken = jwtProvider.createRefreshToken(hUser);

        // 5. 바로 여기서 saveOrUpdate 호출
        // => 로그인할 때마다 DB의 Refresh Token을 최신화
        tokenService.saveOrUpdate(hUser.getId(), refreshToken);

        return new TokenResponse(accessToken, refreshToken, hUser.getUsername());
    }

}
