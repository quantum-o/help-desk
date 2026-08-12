package com.quantum.modmail.user.dto;

import com.quantum.modmail.user.entity.UserRole;
import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record UserResponse(
        UUID id,
        String username,
        String email,
        UserRole role,
        boolean active,
        Instant createdAt,
        Instant updatedAt
)
{ }
