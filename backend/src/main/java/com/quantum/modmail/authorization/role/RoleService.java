package com.quantum.modmail.authorization.role;

import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.permission.repository.PermissionRepository;
import com.quantum.modmail.authorization.role.dto.CreateRoleRequest;
import com.quantum.modmail.authorization.role.dto.RoleResponse;
import com.quantum.modmail.authorization.role.dto.UpdateRoleRequest;
import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.authorization.role.mapper.RoleMapper;
import com.quantum.modmail.authorization.role.repository.RoleRepository;
import com.quantum.modmail.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream().map(RoleMapper::toResponse).collect(Collectors.toList());
    }

    public Role getRoleByCode(String code) {
        Role role = roleRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", "The role with provided code does not exists."));
        return role;
    }

    public RoleResponse getRoleById(UUID id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", "The role with provided code does not exists."));

        return RoleMapper.toResponse(role);
    }

    public RoleResponse createRole(CreateRoleRequest request) {
        if (roleRepository.findByCode(request.code()).isPresent()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "PERMISSION_ALREADY_EXISTS", "The role with code you provided already exists.");
        }

        Role role = Role.builder()
                .name(request.name())
                .code(request.code())
                .build();

        Role savedRole = roleRepository.save(role);

        return RoleMapper.toResponse(savedRole);
    }

    public RoleResponse updateRole(UUID id, UpdateRoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", "The role with provided code does not exists."));

        if (request.permissions() != null) {
            Set<Permission> newPermissions = new HashSet<>(
                    permissionRepository.findAllByCodeIn(request.permissions())
            );

            role.setPermissions(newPermissions);
        }

        return RoleMapper.toResponse(roleRepository.save(role));
    }

    public void deleteRole(UUID id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", "The role with provided code does not exists."));

        roleRepository.deleteById(id);
    }

    public Role getDefaultRole() {
        return roleRepository.findByCode("EVERYONE").orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", "The default role does not exists."));
    }
}
