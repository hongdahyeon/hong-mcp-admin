package io.hong.admin.golbal.auth.service;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.domain.useraccesslog.service.HUserAccessLogService;
import io.hong.admin.domain.usertoken.entity.HUserToken;
import io.hong.admin.domain.usertoken.service.HUserTokenService;
import io.hong.admin.golbal.auth.dto.request.LoginRequest;
import io.hong.admin.golbal.auth.dto.request.ReissueRequest;
import io.hong.admin.golbal.auth.dto.response.TokenResponse;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import io.hong.admin.golbal.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

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
 * 2026-03-14        home       TokenResponse > role 정보 추가
 * 2026-03-15        home       토큰 재발급 시도 프로세스 추가
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final HUserRepository userRepository;
    private final HUserTokenService tokenService;
    private final HUserAccessLogService accessLogService;

    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public TokenResponse login(LoginRequest request, HttpServletRequest req) throws HongException {

        // 1. 유저 조회
        HUser hUser = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new HongException(HongErrorCode.USER_NOT_FOUND));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(request.password(), hUser.getPassword())) {
            throw new HongException(HongErrorCode.PASSWORD_NOT_MATCH);
        }

        // 3. 계정 상세 상태 체크
        validateUserStatus(hUser);

        // 4. 기존 DB에 유효한 Refresh Token이 있는지 확인
        Optional<HUserToken> existingToken = tokenService.findByUserId(hUser.getId());

        String accessToken = jwtProvider.createAccessToken(hUser);
        String refreshToken;

        if (existingToken.isPresent() && existingToken.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            // 유효한 토큰이 있다면 재사용
            refreshToken = existingToken.get().getRefreshToken();
            log.info("기존 유효 리프레시 토큰 사용: {}", hUser.getEmail());

        } else {
            // 없거나 만료되었다면 신규 발급 및 DB 업데이트
            refreshToken = jwtProvider.createRefreshToken(hUser);
            tokenService.saveOrUpdate(hUser.getId(), refreshToken);
            log.info("신규 리프레시 토큰 발급 및 저장: {}", hUser.getEmail());

        }

        // 5. 접속 정보 저장
        accessLogService.saveUserAccessLog(hUser.getId(), req);

        return new TokenResponse(accessToken, refreshToken, hUser.getUsername(), hUser.getRole().getAuthority());
    }

    @Transactional
    public TokenResponse reissue(ReissueRequest request, HttpServletRequest req) throws HongException {
        String clientRefreshToken = request.refreshToken();

        // 1. JWT 자체 유효성 검증
        if (!jwtProvider.validateToken(clientRefreshToken)) {
            throw new HongException(HongErrorCode.INVALID_TOKEN);
        }

        // 2. DB에서 해당 리프레시 토큰으로 데이터 조회 (Service 경유)
        HUserToken savedToken = tokenService.findByRefreshToken(clientRefreshToken)
                .orElseThrow(() -> new HongException(HongErrorCode.INVALID_TOKEN));

        // 3. 리프레시 토큰 만료 여부 체크 (DB의 expiryDate 기준)
        if (savedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            log.warn("리프레시 토큰 만료. 유저 ID: {}", savedToken.getUserId());
            throw new HongException(HongErrorCode.EXPIRED_TOKEN);
        }

        // 4. 새로운 토큰 생성 및 DB 갱신 (Rotation)
        HUser hUser = userRepository.findById(savedToken.getUserId())
                .orElseThrow(() -> new HongException(HongErrorCode.USER_NOT_FOUND));

        String newAccessToken = jwtProvider.createAccessToken(hUser);
        String newRefreshToken = jwtProvider.createRefreshToken(hUser);

        tokenService.saveOrUpdate(hUser.getId(), newRefreshToken);

        return new TokenResponse(newAccessToken, newRefreshToken, hUser.getUsername(), hUser.getRole().getAuthority());
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
