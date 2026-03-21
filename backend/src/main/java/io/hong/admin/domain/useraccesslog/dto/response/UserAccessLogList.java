package io.hong.admin.domain.useraccesslog.dto.response;

import io.hong.admin.domain.useraccesslog.entity.HUserAccessLog;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.dto.response
 * fileName       : UserAccessLog
 * author         : home
 * date           : 2026-03-14
 * description    : User 접근 이력 목록 응답 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 */

@Getter
public class UserAccessLogList {
    private final Long id;
    private final String ipAddress;
    private final String userAgent;
    private final LocalDateTime loginAt;

    private final Long userId;
    private final String userName;
    private final String userEmail;


    // (주의) 쿼리문의 순서와 데이터 타입 정확 일치
    public UserAccessLogList( Long id, String ipAddress, String userAgent,
                              LocalDateTime loginAt, Long userId,
                              String userName, String userEmail ) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.loginAt = loginAt;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}
