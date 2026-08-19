package com.quantum.modmail.user.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import lombok.Builder;

@Builder
public record MeResponse(
        UUID id,
        String username,
        String email,
        List<UUID> roles,
        List<String> permissions,
        Boolean active,
        Instant createdAt,
        Instant updatedAt) {
}
