package com.quantum.modmail.authorization.role.dto;

import java.util.Set;

public record UpdateRoleRequest(
        String code,
        String name,
        Set<String> permissions
) {
}
