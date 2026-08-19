package com.quantum.modmail.user.dto;

import java.util.Set;
import java.util.UUID;

public record CreateUserRequest(
        String username,
        String email,
        String password,
        Set<UUID> roles,
        boolean active
) {
}
