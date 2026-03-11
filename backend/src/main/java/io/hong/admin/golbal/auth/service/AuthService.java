package io.hong.admin.golbal.auth.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.domain.useraccesslog.service.HUserAccessLogService;
import io.hong.admin.domain.usertoken.service.HUserTokenService;
import io.hong.admin.golbal.auth.dto.request.LoginRequest;
import io.hong.admin.golbal.auth.dto.response.TokenResponse;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import io.hong.admin.golbal.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.golbal.auth.service
 * fileName       : AuthService
 * author         : home
 * date           : 2026-03-03
 * description    : AuthService Class
 *                  => {BCrypt}로 비밀번호를 검사하고,
 *                     성공하면 유저의 모든 상태값을 토큰에 담아 발행
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 * 2026-03-04        home       접속 정보 저장
 * 2026-03-11        home       HongException > HongErrorCode로 통일
 */

@Service
@RequiredArgsConstructor
public class AuthService {

    private final HUserRepository userRepository;
    private final HUserTokenService tokenService;
    private final HUserAccessLogService accessLogService;

    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest request, HttpServletRequest req ) throws HongException {

        // 1. 유저 조회
        HUser hUser = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new HongException(HongErrorCode.USER_NOT_FOUND));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(request.password(), hUser.getPassword())) {
            throw new HongException(HongErrorCode.PASSWORD_NOT_MATCH);
        }

        // 3. 계정 상세 상태 체크 (필터 대신 로그인 시점에 수행)
        validateUserStatus(hUser);

        // 4. 토큰 발행 (HUser 정보를 Claims에 가득 담아 보냄)
        String accessToken = jwtProvider.createAccessToken(hUser);
        String refreshToken = jwtProvider.createRefreshToken(hUser);

        // 5. 바로 여기서 saveOrUpdate 호출
        // => 로그인할 때마다 DB의 Refresh Token을 최신화
        tokenService.saveOrUpdate(hUser.getId(), refreshToken);

        // 6. 접속 정보 저장
        accessLogService.saveUserAccessLog(hUser.getId(), req);

        return new TokenResponse(accessToken, refreshToken, hUser.getUsername());
    }

    /**
     * 유저 계정 상태 검증 로직 분리
     */
    private void validateUserStatus(HUser hUser) throws HongException {
        // (1) 탈퇴 여부
        if (hUser.isDeleted()) {
            throw new HongException(HongErrorCode.USER_DELETED);
        }
        // (2) 잠금 여부
        if (hUser.isLocked()) {
            throw new HongException(HongErrorCode.USER_LOCKED);
        }
        // (3) 승인 여부
        if (!hUser.isApproved()) {
            throw new HongException(HongErrorCode.USER_NOT_APPROVED);
        }
        // (4) 활성화 여부
        if (!hUser.isEnabled()) {
            throw new HongException(HongErrorCode.USER_FORBIDDEN);
        }
        // (5) 비밀번호 만료 체크 (90일)
        if (hUser.getLastPasswordChangedDate() != null &&
                hUser.getLastPasswordChangedDate().isBefore(LocalDateTime.now().minusDays(90))) {
            throw new HongException(HongErrorCode.PASSWORD_EXPIRED);
        }
    }

}
