package com.quantum.modmail.authorization.role.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Builder
public record RoleResponse(
        UUID id,
        String code,
        String name,
        List<String> permissionList,
        Instant createdAt,
        Instant updatedAt
) {
}
