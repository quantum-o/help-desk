package com.quantum.modmail.authorization.permission.dto;

public record UpdatePermissionRequest(
        String code,
        String description
) {
}
