package io.hong.admin.domain.user.controller.api;

import io.hong.admin.domain.user.enumcd.UserRole;
import io.hong.admin.domain.user.service.HUserService;
import io.hong.admin.domain.user.dto.request.UserSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * packageName    : io.hong.admin.domain.user.controller.api
 * fileName       : HUserRestController
 * author         : note
 * date           : 2026-03-03
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2026-03-03        home       최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth-user")
public class HUserRestController {

    private final HUserService hUserService;

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam String email) {
        boolean check = hUserService.checkEmailDuplicate(email);
        return ResponseEntity.ok(check);
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean check = hUserService.checkUsernameDuplicate(username);
        return ResponseEntity.ok(check);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<UserRole>> findUserRoles() {
        UserRole[] values = UserRole.values();
        return ResponseEntity.ok(List.of(values));
    }

    @PostMapping("/signup")
    public ResponseEntity<Long> signup(@RequestBody UserSaveRequest dto) {
        Long userId = hUserService.saveUser(dto);
        return ResponseEntity.ok(userId);
    }
}
