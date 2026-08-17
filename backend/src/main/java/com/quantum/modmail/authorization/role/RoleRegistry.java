package com.quantum.modmail.authorization.role;

import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.authorization.role.dto.RoleDefinition;

import java.util.Map;
import java.util.Set;

public final class RoleRegistry {
    private RoleRegistry() {
    }

    public static final Map<String, RoleDefinition> DEFINITIONS = Map.ofEntries(
            Map.entry("SUPERADMIN",
                    new RoleDefinition(
                            "Superadmin",
                            Set.of(PermissionCode.ADMINISTRATOR)
                    )),

            Map.entry("ADMIN",
                    new RoleDefinition(
                            "Administrator",
                            Set.of(
                                    // User Management
                                    PermissionCode.USER_READ,
                                    PermissionCode.USER_CREATE,
                                    PermissionCode.USER_UPDATE,
                                    PermissionCode.USER_DELETE,
                                    // Role Management - read and update only
                                    PermissionCode.ROLE_READ,
                                    PermissionCode.ROLE_UPDATE
                            ))),

            Map.entry("AGENT",
                    new RoleDefinition(
                            "Support Agent",
                            Set.of(
                                    // Ticket Management
                                    PermissionCode.TICKET_READ,
                                    PermissionCode.TICKET_CREATE,
                                    PermissionCode.TICKET_UPDATE,
                                    PermissionCode.TICKET_DELETE,
                                    // Category Management - read only
                                    PermissionCode.CATEGORY_READ
                            ))),

            Map.entry("EVERYONE",
                    new RoleDefinition(
                            "Everyone",

                            Set.of()
                    )
            ));
}
