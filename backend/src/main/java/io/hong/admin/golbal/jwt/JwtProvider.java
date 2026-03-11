package io.hong.admin.golbal.jwt;

import io.hong.admin.domain.user.entity.HUser;
import io.hong.admin.golbal.auth.HAuthUserDetail;
import io.hong.admin.golbal.exception.HongException;
import io.hong.admin.golbal.exception.error.HongErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * packageName    : io.hong.admin.golbal.jwt
 * fileName       : JwtProvider
 * author         : home
 * date           : 2026-03-03
 * description    : JwtProvider Class
 *                  - 토큰의 생성, 파싱, 검증 담당
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */


@Slf4j
@Component
public class JwtProvider {

    private final SecretKey key;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;

    public JwtProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-validity}") long accessTokenValidity,
            @Value("${jwt.refresh-token-validity}") long refreshTokenValidity) {
        /*
        * 최신 jjwt 버전에서는 Keys.hmacShaKeyFor를 권장
        * */
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.accessTokenValidity = accessTokenValidity;
        this.refreshTokenValidity = refreshTokenValidity;
    }

    // 1. Access Token 생성
    public String createAccessToken(HUser user) {
        return createToken(user, accessTokenValidity);
    }

    // 2. Refresh Token 생성
    public String createRefreshToken(HUser user) {
        return createToken(user, refreshTokenValidity);
    }

    private String createToken(HUser user, long validity) {
        Claims claims = Jwts.claims()
                .subject(user.getEmail())
                .add("role", user.getRole().getAuthority())
                .add("userId", user.getId())
                .build();

        Date now = new Date();
        Date validityDate = new Date(now.getTime() + validity);

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(validityDate)
                .signWith(key)
                .compact();
    }

    // 3. 토큰에서 이메일 추출
    public String getEmail(String  token) {
        return getClaims(token).getSubject();
    }

    // 4. 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("잘못된 JWT 토큰입니다: {}", e.getMessage());
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Authentication getAuthentication(String token) throws HongException {

        try {
            Claims claims = getClaims(token);
            String email = claims.getSubject();
            String roleClaim = claims.get("role", String.class);
            Long userIdClaim = claims.get("userId", Long.class);

            // 매 요청마다 DB 조회를 통해 최신 상태의 UserDetails(HAuthUserDetail)를 가져옴
            UserDetails userDetails = HAuthUserDetail.of(userIdClaim, email, roleClaim);
            return new UsernamePasswordAuthenticationToken(
                    userDetails,
                    token,
                    userDetails.getAuthorities()
            );

        } catch (JwtException e) {
            log.error("토큰 파싱 중 오류 발생: {}", e.getMessage());
            throw new HongException(HongErrorCode.INVALID_TOKEN);

        } catch (UsernameNotFoundException e) {
            log.error("토큰의 이메일에 해당하는 유저를 찾을 수 없음: {}", e.getMessage());
            throw new HongException(HongErrorCode.USER_NOT_FOUND_BY_TOKEN);

        } catch (Exception e) {
            log.error("예상치 못한 인증 오류: {}", e.getMessage());
            throw new HongException(HongErrorCode.AUTHENTICATION_FAILED);
        }
    }
}
