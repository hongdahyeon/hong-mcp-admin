package io.hong.admin.domain.useraccesslog.service;

import io.hong.admin.domain.useraccesslog.dto.request.SearchUserAccessLogRequest;
import io.hong.admin.domain.useraccesslog.dto.response.UserAccessLogListResponse;
import io.hong.admin.domain.useraccesslog.entity.HUserAccessLog;
import io.hong.admin.domain.useraccesslog.repository.HUserAccessLogRepository;
import io.hong.admin.golbal.common.page.PageResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
 * 2026-03-14        home       유저 접근 이력 페이징 조회 추가
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

    public PageResponseDto<UserAccessLogListResponse> findUserAccessLogPage(SearchUserAccessLogRequest search) {
        Pageable pageable = search.toPageable(Sort.by("id").descending());
        Page<UserAccessLogListResponse> userPage = repository.findAllWithUserInfo(pageable);
        return new PageResponseDto<>(userPage);
    }
}
