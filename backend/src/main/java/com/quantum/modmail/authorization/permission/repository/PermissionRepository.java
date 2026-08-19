package com.quantum.modmail.authorization.permission.repository;

import com.quantum.modmail.authorization.permission.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByCode(String code);

    Set<Permission> findAllByCodeIn(Set<String> codes);
}
