package io.hong.admin.domain.usertoken.service;

import io.hong.admin.domain.usertoken.entity.HUserToken;
import io.hong.admin.domain.usertoken.repository.HUserTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * packageName    : io.hong.admin.domain.usertoken.service
 * fileName       : HUserTokenService
 * author         : note
 * date           : 2026-03-03
 * description    : HUserTokenService Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HUserTokenService {

    private final HUserTokenRepository tokenRepository;

    @Transactional
    public void saveOrUpdate(Long userId, String refreshToken) {

        // 1. findById 호출 :: 영속성 컨텍스트에 엔티티 로드 (1차 캐시 저장 & 스냅샷 찍기)
        HUserToken token = tokenRepository.findById(userId)
                .map(t -> {
                    // 2. 객체 값 변경
                    // :: 영속성 컨텍스트 내부의 객체 상태만 바뀜 (아직 DB 변경 X)
                    t.updateToken(refreshToken); // 기존 토큰 갱신
                    return t;
                })
                .orElseGet(() -> HUserToken.builder()
                        .userId(userId)
                        .refreshToken(refreshToken)
                        .expiryDate(LocalDateTime.now().plusDays(7))
                        .build());
        tokenRepository.save(token);

        // 3. 메소드 종료(@Transactional 종료) :: Tx 커밋 발생
        // 4. JPA가 스냅샷과 비교 후, '수정됏음'을 감지하고 UPDATE 쿼리 자동 전송 (Dirty Checking)
    }
}
