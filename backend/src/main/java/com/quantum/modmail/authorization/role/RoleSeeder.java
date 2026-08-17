package com.quantum.modmail.authorization.role;

import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.authorization.permission.repository.PermissionRepository;
import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.authorization.role.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleSeeder {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public void seed() {
        RoleRegistry.DEFINITIONS.forEach((code, definition) -> {
            Role role = roleRepository.findByCode(code).orElseGet(Role::new);

            role.setName(definition.name());
            role.setCode(code);

            Set<Permission> permissions = new HashSet<>();
            for (PermissionCode permissionCode : definition.permissions()) {
                permissionRepository.findByCode(permissionCode.name())
                        .ifPresent(permissions::add);
            }
            role.setPermissions(permissions);

            roleRepository.save(role);
        });
    }
}
