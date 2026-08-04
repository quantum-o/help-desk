package com.quantum.modmail.user.dto;

import com.quantum.modmail.user.entity.UserRole;

import java.util.UUID;

public record MeResponse(
        UUID id,
        String email,
        UserRole role) {
}
