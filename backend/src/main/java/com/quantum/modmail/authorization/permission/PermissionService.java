package com.quantum.modmail.authorization.permission;

import com.quantum.modmail.authorization.permission.dto.CreatePermissionRequest;
import com.quantum.modmail.authorization.permission.dto.PermissionResponse;
import com.quantum.modmail.authorization.permission.dto.UpdatePermissionRequest;
import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.authorization.permission.mapper.PermissionMapper;
import com.quantum.modmail.authorization.permission.repository.PermissionRepository;
import com.quantum.modmail.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public List<PermissionResponse> getAllPermissions() {
        return permissionRepository.findAll().stream().map(PermissionMapper::toResponse).collect(Collectors.toList());
    }

    public Permission getPermissionByCode(String code) {
        Permission permission = permissionRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "PERMISSION_NOT_FOUND", "The permission with provided code does not exists."));

        return permission;
    }

    public PermissionResponse getPermissionById(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "PERMISSION_NOT_FOUND", "The permission with provided code does not exists."));

        return PermissionMapper.toResponse(permission);
    }

    public PermissionResponse createPermission(CreatePermissionRequest request) {
        if (permissionRepository.findByCode(request.code()).isPresent()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "PERMISSION_ALREADY_EXISTS", "The permission with code you provided already exists.");
        }

        Permission permission = Permission.builder()
                .code(request.code())
                .description(request.description())
                .build();

        Permission savedPermission = permissionRepository.save(permission);

        return PermissionMapper.toResponse(savedPermission);
    }

    public PermissionResponse updatePermission(Long id, UpdatePermissionRequest request) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "PERMISSION_NOT_FOUND", "The permission with provided code does not exists."));

        if (request.description() != null) {
            permission.setDescription(request.description());
        }

        return PermissionMapper.toResponse(permissionRepository.save(permission));
    }

    public void deletePermission(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "PERMISSION_NOT_FOUND", "The permission with provided code does not exists."));

        permissionRepository.deleteById(id);
    }

    public boolean hasPermission(PermissionCode[] pList, boolean matchAny) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            return false;
        }

        boolean hasAdministrator = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(PermissionCode.ADMINISTRATOR.name()));

        if (hasAdministrator) {
            return true;
        }

        boolean match;
        if (matchAny) {
            match = Arrays.stream(pList).map(Enum::name)
                    .anyMatch(permission ->
                            auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(permission)));
        } else {
            match = Arrays.stream(pList).map(Enum::name)
                    .allMatch(permission ->
                            auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(permission)));
        }

        return match;
    }

    public boolean hasPermission(PermissionCode permissionCode) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            return false;
        }

        boolean hasAdministrator = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(PermissionCode.ADMINISTRATOR.name()));

        if (hasAdministrator) {
            return true;
        }

        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(permissionCode.name()));
    }
}
