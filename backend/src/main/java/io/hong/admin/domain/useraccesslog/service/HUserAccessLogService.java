package io.hong.admin.domain.useraccesslog.service;

import io.hong.admin.domain.useraccesslog.entity.HUserAccessLog;
import io.hong.admin.domain.useraccesslog.repository.HUserAccessLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.service
 * fileName       : HUserAccessLogService
 * author         : home
 * date           : 2026-03-04
 * description    : HUserAccessLogService Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HUserAccessLogService {

    private final HUserAccessLogRepository repository;

    @Transactional
    public void saveUserAccessLog(Long userId, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");

        HUserAccessLog log = HUserAccessLog.builder()
                .userId(userId)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .build();

        repository.save(log);
    }
}
