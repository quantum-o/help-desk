package com.quantum.modmail.authorization.role.dto;

import com.quantum.modmail.authorization.permission.entity.PermissionCode;

import java.util.Set;

public record RoleDefinition(
        String name,
        Set<PermissionCode> permissions
) {}
