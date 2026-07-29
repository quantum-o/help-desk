package com.quantum.modmail.auth.dto;

import org.springframework.http.ResponseCookie;

public record AuthResult(AuthResponse response, ResponseCookie refreshCookie) {
}
