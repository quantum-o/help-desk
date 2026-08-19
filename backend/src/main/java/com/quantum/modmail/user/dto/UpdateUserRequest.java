package com.quantum.modmail.user.dto;

import java.util.Set;
import java.util.UUID;

public record UpdateUserRequest(
        String username,
        String password,
        Set<UUID> roles,
        Boolean active
) {
}
