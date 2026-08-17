package com.quantum.modmail.authorization.permission.mapper;

import com.quantum.modmail.authorization.permission.dto.PermissionResponse;
import com.quantum.modmail.authorization.permission.entity.Permission;

public class PermissionMapper {
    public static PermissionResponse toResponse(Permission permission) {
        return PermissionResponse.builder()
                .id(permission.getId())
                .code(permission.getCode())
                .description(permission.getDescription())
                .createdAt(permission.getCreatedAt())
                .updatedAt(permission.getUpdatedAt())
                .build();
    }
}
