package io.hong.admin.golbal.interceptor;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.domain.user.repository.HUserRepository;
import io.hong.admin.golbal.auth.HAuthUserDetail;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.golbal.interceptor
 * fileName       : HUserStatusInterceptor
 * author         : home
 * date           : 2026-03-11
 * description    : User 상태 정보에 대한 인터셉터
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-11        home       최초 생성
 */

@Component
@RequiredArgsConstructor
public class HUserStatusInterceptor implements HandlerInterceptor {

    private final HUserRepository hUserRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws HongException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof HAuthUserDetail detail)) {
            return true;
        }

        // 여기서 비로소 DB 조회 수행
        HUser hUser = hUserRepository.findById(detail.userId())
                .orElseThrow(() -> new HongException(HongErrorCode.USER_NOT_FOUND));

        // 3. 계정 상세 상태 체크
        validateUserStatus(hUser);

        return true;
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
