package com.quantum.modmail.authorization.permission.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record PermissionResponse(
        Long id,
        String code,
        String description,
        String category,
        Instant createdAt,
        Instant updatedAt
) {
}
