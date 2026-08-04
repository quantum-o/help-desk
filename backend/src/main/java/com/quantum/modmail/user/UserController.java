package com.quantum.modmail.user;

import com.quantum.modmail.common.response.ApiResponse;

import com.quantum.modmail.user.dto.MeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<MeResponse>> me(Authentication authentication) {
        String email = authentication.getName();
        MeResponse meResponse = userService.getMe(email);

        return ResponseEntity.ok(ApiResponse.ok("User info", meResponse));
    }
}
