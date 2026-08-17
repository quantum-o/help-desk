package com.quantum.modmail.authorization.role;

import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.authorization.role.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleSeeder {

    private final RoleRepository roleRepository;

    public void seed() {
        createRoleIfNotExists("everyone", "EVERYONE");
    }

    private void createRoleIfNotExists(String name, String code) {
        if (roleRepository.findByCode(code).isEmpty()) {
            roleRepository.save(
                    Role.builder()
                            .name(name)
                            .code(code)
                            .build()
            );
        }
    }
}
