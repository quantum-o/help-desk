package com.quantum.modmail.authorization.permission.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record PermissionResponse(
        Long id,
        String code,
        String description,
        Instant createdAt,
        Instant updatedAt
) {
}
