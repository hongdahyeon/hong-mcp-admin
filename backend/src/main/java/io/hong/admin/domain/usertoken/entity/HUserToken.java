package io.hong.admin.domain.usertoken.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.usertoken.entity
 * fileName       : HUserToken
 * author         : home
 * date           : 2026-03-03
 * description    : HUserToken Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Entity
@Getter
@Table(name = "h_user_token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HUserToken {

    @Id
    @Column(name = "user_id")
    private Long userId;        // HUSER의 PK를 그대로 PK로 사용

    @Column(nullable = false, length = 500)
    private String refreshToken;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Builder
    public HUserToken(Long userId, String refreshToken, LocalDateTime expiryDate) {
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.expiryDate = expiryDate;
    }

    public void updateToken(String newToken) {
        this.refreshToken = newToken;
        this.expiryDate = LocalDateTime.now().plusDays(7);
    }
}
