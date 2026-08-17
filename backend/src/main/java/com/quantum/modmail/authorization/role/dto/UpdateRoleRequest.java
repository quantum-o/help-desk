package com.quantum.modmail.authorization.role.dto;

import java.util.List;

public record UpdateRoleRequest(
        String code,
        String name,
        List<String> permissions
) {
}
