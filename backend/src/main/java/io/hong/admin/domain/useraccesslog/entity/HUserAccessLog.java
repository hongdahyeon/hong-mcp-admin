package io.hong.admin.domain.useraccesslog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.useraccesslog.entity
 * fileName       : HUserAccessLog
 * author         : home
 * date           : 2026-03-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-04        home       최초 생성
 */
@Entity @Table(name = "h_user_access_log")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HUserAccessLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    
    private String ipAddress;
    
    private String userAgent;
    
    private LocalDateTime loginAt = LocalDateTime.now();

    @Builder
    public HUserAccessLog(Long userId, String ipAddress, String userAgent) {
        this.userId = userId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
    }
}
