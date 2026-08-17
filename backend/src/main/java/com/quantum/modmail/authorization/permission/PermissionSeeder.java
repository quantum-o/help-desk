package com.quantum.modmail.authorization.permission;

import com.quantum.modmail.authorization.permission.dto.PermissionDefinition;
import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.authorization.permission.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PermissionSeeder {

    private final PermissionRepository permissionRepository;

    public void seed() {
        for (PermissionCode code : PermissionCode.values()) {

            PermissionDefinition definition =
                    PermissionRegistry.DEFINITIONS.get(code);

            Permission permission = permissionRepository
                    .findByCode(code.name())
                    .orElseGet(Permission::new);

            permission.setCode(code.name());
            permission.setName(definition.name());
            permission.setDescription(definition.description());
            permission.setCategory(definition.category());

            permissionRepository.save(permission);
        }
    }
}
