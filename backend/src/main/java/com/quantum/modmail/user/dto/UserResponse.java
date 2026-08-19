package com.quantum.modmail.user.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Builder
public record UserResponse(
        UUID id,
        String username,
        String email,
        List<UUID> roles,
        boolean active,
        Instant createdAt,
        Instant updatedAt
)
{ }
