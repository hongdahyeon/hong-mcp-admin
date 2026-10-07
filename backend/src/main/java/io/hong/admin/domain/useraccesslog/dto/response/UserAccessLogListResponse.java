package io.hong.admin.domain.useraccesslog.dto.response;

import lombok.Getter;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.dto.response
 * fileName       : UserAccessLogListResponse
 * author         : home
 * date           : 2026-03-14
 * description    : User 접근 이력 목록 응답 DTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-14        home       최초 생성
 * 2026-04-22        note       클래스명 변경
 */

@Getter
public class UserAccessLogListResponse {
    private final Long id;
    private final String ipAddress;
    private final String userAgent;
    private final LocalDateTime loginAt;

    private final Long userId;
    private final String userName;
    private final String userEmail;


    // (주의) 쿼리문의 순서와 데이터 타입 정확 일치
    public UserAccessLogListResponse(Long id, String ipAddress, String userAgent,
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
