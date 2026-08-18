package com.quantum.modmail.user.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record MeResponse(
        UUID id,
        String username,
        String email,
        List<String> permissions,
        Instant createdAt,
        Instant updatedAt) {
}
