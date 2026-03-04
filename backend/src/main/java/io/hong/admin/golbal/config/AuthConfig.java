package io.hong.admin.golbal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * packageName    : io.hong.admin.golbal.config
 * fileName       : AuthConfig
 * author         : home
 * date           : 2026-03-03
 * description    : AuthConfig Class
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@Configuration
public class AuthConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Java 25 환경에서도 표준인 BCrypt 사용
        return new BCryptPasswordEncoder();
    }
}
