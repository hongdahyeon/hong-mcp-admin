package io.hong.admin.golbal.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * packageName    : io.hong.admin.golbal.audit
 * fileName       : AuditorAwareImpl
 * author         : home
 * date           : 2026-03-04
 * description    : AuditorAwareImpl Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // 1. SecurityContext에서 인증 정보 꺼내기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. 인증 정보가 없거나, 익명 사용자인 경우 처리
        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.of("SYSTEM");
        }

        // 3. 현재 로그인한 유저의 이메일(또는 ID) 반환
        // Principal이 HAuthUserDetail(record)이므로 getName()이나 직접 캐스팅해서 사용 가능합니다.
        return Optional.of(authentication.getName());
    }
}
