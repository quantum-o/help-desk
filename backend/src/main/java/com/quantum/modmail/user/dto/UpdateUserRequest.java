package com.quantum.modmail.user.dto;

public record UpdateUserRequest(
        String username,
        String password,
        String role,
        Boolean active
) {
}
