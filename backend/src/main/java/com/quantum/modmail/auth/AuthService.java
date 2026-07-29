package com.quantum.modmail.auth;

import com.quantum.modmail.auth.dto.AuthResponse;
import com.quantum.modmail.auth.dto.AuthResult;
import com.quantum.modmail.auth.dto.LoginRequest;
import com.quantum.modmail.auth.dto.RegisterRequest;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.security.jwt.JwtProperties;
import com.quantum.modmail.security.jwt.JwtService;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.entity.UserRole;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    public AuthResult register(RegisterRequest request) {
        String email = request.email();
        if (userRepository.existsByEmail(email)) {
            throw new BusinessException(HttpStatus.CONFLICT, "USER_EMAIL_ALREADY_EXISTS", "Email is already in use");
        }

        String hashedPassword = passwordEncoder.encode(request.password());


        User user = User.builder().email(email)
                .username(email.split("@")[0])
                .passwordHash(hashedPassword)
                .role(UserRole.CUSTOMER)
                .active(true)
                .build();

        userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        ResponseCookie responseCookie = this.createRefreshCookie(refreshToken);

        return new AuthResult(new AuthResponse(accessToken), responseCookie);
    }

    public AuthResult login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid username or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid username or password");
        }

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        ResponseCookie responseCookie = this.createRefreshCookie(refreshToken);

        return new AuthResult(new AuthResponse(accessToken), responseCookie);
    }

    public ResponseCookie createRefreshCookie(String refreshToken) {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge((int) jwtProperties.getRefreshTokenExpiration())
                .build();
    }

    public AuthResponse refresh(String refreshToken) {
        String email = jwtService.extractEmail(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "EXPIRED_TOKEN", "Your token has been expired"));

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        return new AuthResponse(accessToken);
    }
}
