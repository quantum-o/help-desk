package com.quantum.modmail.auth;

import com.quantum.modmail.auth.dto.AuthResponse;
import com.quantum.modmail.auth.dto.AuthResult;
import com.quantum.modmail.auth.dto.LoginRequest;
import com.quantum.modmail.auth.dto.RegisterRequest;
import com.quantum.modmail.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    private ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResult result = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, result.refreshCookie().toString())
                .body(ApiResponse.ok("User registered successfully", result.response()));
    }

    @PostMapping("/login")
    private ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResult result = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, result.refreshCookie().toString())
                .body(ApiResponse.ok("User logged in successfully", result.response()));
    }

    @PostMapping("/refresh")
    private ResponseEntity<ApiResponse<AuthResponse>> refresh(@CookieValue(name = "refresh_token", required = false) String refreshToken) {
        AuthResponse response = authService.refresh(refreshToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.ok("Access token refreshed", response));
    }
}
