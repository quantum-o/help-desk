package com.quantum.modmail.user.mapper;

import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.user.dto.MeResponse;
import com.quantum.modmail.user.dto.UserResponse;
import com.quantum.modmail.user.entity.User;

import java.util.Comparator;

public class UserMapper {
    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Role::getId).toList())
                .active(user.isActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public static MeResponse toMeResponse(User user) {
        return MeResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Role::getId).toList())
                .permissions(user.getRoles().stream()
                        .flatMap(role -> role.getPermissions().stream())
                        .map(Permission::getCode)
                        .distinct()
                        .sorted(Comparator.naturalOrder())
                        .toList())
                .active(user.isActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
