package io.hong.admin.golbal.config;

import io.hong.admin.domain.user.enumcd.UserRole;
import io.hong.admin.golbal.jwt.JwtFilter;
import io.hong.admin.golbal.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


/**
 * packageName    : io.hong.admin.golbal.config
 * fileName       : SecurityConfig
 * author         : home
 * date           : 2026-03-03
 * description    : SecurityConfig Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // @PreAuthorize("hasRole('HOST')") 등을 사용하기 위함
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;

    @Value("${hong.front-url}")
    private String FRONT_BASE_URL;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(this::csrfConfigurer)
                .cors(this::corsConfigurer)
                // 세션 정책 분리
                .sessionManagement(this::sessionManagementConfigurer)
                .authorizeHttpRequests(this::configureAuthorizeRequests)
                // JWT 필터 추가
                .addFilterBefore(new JwtFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
                .headers(this::configureHeaders)
                .build();
    }


    // 1. CSRF 설정
    private void csrfConfigurer(CsrfConfigurer<HttpSecurity> csrf) {
        csrf.disable();
    }

    // 2. CORS 설정 분리
    private void corsConfigurer(CorsConfigurer<HttpSecurity> cors) {
        cors.configurationSource(request -> {
            var config = new CorsConfiguration();
            config.setAllowedOrigins(List.of(FRONT_BASE_URL));
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
            config.setAllowCredentials(true);
            config.setAllowedHeaders(List.of("*"));
            config.setMaxAge(3600L);
            return config;
        });
    }

    // 3. 세션 정책 설정 (JWT 사용을 위해 STATELESS 설정)
    private void sessionManagementConfigurer(SessionManagementConfigurer<HttpSecurity> session) {
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    // 4. 권한 설정 분리
    private void configureAuthorizeRequests(
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
    ) {
        auth.requestMatchers(AnonymousPath.ANONYMOUS_PATH).permitAll();

        // 1. 유저 경로는 유저, 호스트, 어드민 모두 가능
        auth.requestMatchers(UserRole.USER.getMatchersArray()).hasAnyAuthority("ROLE_USER", "ROLE_HOST", "ROLE_ADMIN");

        // 2. 호스트 경로는 호스트, 어드민 가능
        auth.requestMatchers(UserRole.HOST.getMatchersArray()).hasAnyAuthority("ROLE_HOST", "ROLE_ADMIN");

        // 3. 어드민 경로는 어드민만 가능
        auth.requestMatchers(UserRole.ADMIN.getMatchersArray()).hasAuthority("ROLE_ADMIN");

        // 나머지)) 그 외 모든 요청은 로그인 필요
        auth.anyRequest().authenticated();
    }

    // 4. Headers 설정 분리 (H2 Console 프레임 오류 해결)
    private void configureHeaders(HeadersConfigurer<HttpSecurity> headers) {
        headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin);
    }
}
