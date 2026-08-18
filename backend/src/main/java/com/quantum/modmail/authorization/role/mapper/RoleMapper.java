package com.quantum.modmail.authorization.role.mapper;

import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.role.dto.RoleResponse;
import com.quantum.modmail.authorization.role.entity.Role;

public class RoleMapper {
    public static RoleResponse toResponse(Role role) {
        return RoleResponse.builder()
                .id(role.getId())
                .code(role.getCode())
                .name(role.getName())
                .permissionList(role.getPermissions().stream().map(Permission::getCode).toList())
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }
}
