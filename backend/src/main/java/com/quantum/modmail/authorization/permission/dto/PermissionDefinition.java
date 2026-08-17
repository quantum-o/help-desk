package com.quantum.modmail.authorization.permission.dto;

public record PermissionDefinition(
        String name,
        String description,
        String category
) {}