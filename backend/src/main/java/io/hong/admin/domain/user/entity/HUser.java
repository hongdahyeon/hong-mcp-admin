package io.hong.admin.domain.user.entity;

import io.hong.admin.domain.user.enumcd.UserRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.user.entity
 * fileName       : HUser
 * author         : note
 * date           : 2026-03-03
 * description    : HUser Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Entity
@Table(name = "h_user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role; // ROLE_USER, ROLE_HOST, ROLE_ADMIN

    // 상태 관리 필드 추가
    @Column(nullable = false)
    private boolean isApproved = false; // 공방 호스트 등 승인 대기용

    @Column(nullable = false)
    private boolean isLocked = false;   // 비밀번호 실패 등으로 인한 잠금

    @Column(nullable = false)
    private boolean isDeleted = false;  // 서비스 탈퇴 여부

    @Column(nullable = false)
    private boolean isEnabled = true; // 계정 활성화 여부 추가

    @Column(nullable = false)
    private LocalDateTime lastPasswordChangedDate = LocalDateTime.now(); // 비밀번호 마지막 변경일

    @Builder
    public HUser( String email, String password, String username, UserRole role,
                  boolean isApproved, boolean isLocked, boolean isDeleted, boolean isEnabled ) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.role = role;
        this.isApproved = isApproved;
        this.isLocked = isLocked;
        this.isDeleted = isDeleted;
        this.isEnabled = isEnabled;
        this.lastPasswordChangedDate = LocalDateTime.now();
    }
}
