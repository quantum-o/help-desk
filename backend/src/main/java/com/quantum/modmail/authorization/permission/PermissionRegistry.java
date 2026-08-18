package com.quantum.modmail.authorization.permission;

import com.quantum.modmail.authorization.permission.dto.PermissionDefinition;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;

import java.util.Map;

public final class PermissionRegistry {
	private PermissionRegistry() {
	}

	public static final Map<PermissionCode, PermissionDefinition> DEFINITIONS = Map.ofEntries(
			Map.entry(PermissionCode.ADMINISTRATOR,
					new PermissionDefinition(
							"Administrator",
							"Grants all permissions",
							"System")),

			// USER_MANAGEMENT
			Map.entry(PermissionCode.USER_READ,
					new PermissionDefinition(
							"View Users",
							"Allows viewing users",
							"USER_MANAGEMENT")),
			Map.entry(PermissionCode.USER_CREATE,
					new PermissionDefinition(
							"Create Users",
							"Allows creating users",
							"USER_MANAGEMENT")),
			Map.entry(PermissionCode.USER_UPDATE,
					new PermissionDefinition(
							"Update Users",
							"Allows updating users",
							"USER_MANAGEMENT")),
			Map.entry(PermissionCode.USER_DELETE,
					new PermissionDefinition(
							"Delete Users",
							"Allows deleting users",
							"USER_MANAGEMENT")),

			// Role Management
			Map.entry(PermissionCode.ROLE_READ,
					new PermissionDefinition(
							"View Roles",
							"Allows viewing roles",
							"ROLE_MANAGEMENT")),
			Map.entry(PermissionCode.ROLE_CREATE,
					new PermissionDefinition(
							"Create Roles",
							"Allows creating roles",
							"ROLE_MANAGEMENT")),
			Map.entry(PermissionCode.ROLE_UPDATE,
					new PermissionDefinition(
							"Update Roles",
							"Allows updating roles",
							"ROLE_MANAGEMENT")),
			Map.entry(PermissionCode.ROLE_DELETE,
					new PermissionDefinition(
							"Delete Roles",
							"Allows deleting roles",
							"ROLE_MANAGEMENT")),

			// Permission Management
			Map.entry(PermissionCode.PERMISSION_READ,
					new PermissionDefinition(
							"View Permissions",
							"Allows viewing permissions",
							"PERMISSION_MANAGEMENT")),
			Map.entry(PermissionCode.PERMISSION_CREATE,
					new PermissionDefinition(
							"Create Permissions",
							"Allows creating permissions",
							"PERMISSION_MANAGEMENT")),
			Map.entry(PermissionCode.PERMISSION_UPDATE,
					new PermissionDefinition(
							"Update Permissions",
							"Allows updating permissions",
							"PERMISSION_MANAGEMENT")),
			Map.entry(PermissionCode.PERMISSION_DELETE,
					new PermissionDefinition(
							"Delete Permissions",
							"Allows deleting permissions",
							"PERMISSION_MANAGEMENT")),

			// Ticket Management
			Map.entry(PermissionCode.TICKET_READ,
					new PermissionDefinition(
							"View Tickets",
							"Allows viewing tickets",
							"TICKET_MANAGEMENT")),
			Map.entry(PermissionCode.TICKET_CREATE,
					new PermissionDefinition(
							"Create Tickets",
							"Allows creating tickets",
							"TICKET_MANAGEMENT")),
			Map.entry(PermissionCode.TICKET_UPDATE,
					new PermissionDefinition(
							"Update Tickets",
							"Allows updating tickets",
							"TICKET_MANAGEMENT")),
			Map.entry(PermissionCode.TICKET_DELETE,
					new PermissionDefinition(
							"Delete Tickets",
							"Allows deleting tickets",
							"TICKET_MANAGEMENT")),

			// Category Management
			Map.entry(PermissionCode.CATEGORY_READ,
					new PermissionDefinition(
							"View Categories",
							"Allows viewing categories",
							"CATEGORY_MANAGEMENT")),
			Map.entry(PermissionCode.CATEGORY_CREATE,
					new PermissionDefinition(
							"Create Categories",
							"Allows creating categories",
							"CATEGORY_MANAGEMENT")),
			Map.entry(PermissionCode.CATEGORY_UPDATE,
					new PermissionDefinition(
							"Update Categories",
							"Allows updating categories",
							"CATEGORY_MANAGEMENT")),
			Map.entry(PermissionCode.CATEGORY_DELETE,
					new PermissionDefinition(
							"Delete Categories",
							"Allows deleting categories",
							"CATEGORY_MANAGEMENT")));

	public static PermissionDefinition getDefinition(String code) {
		PermissionCode permissionCode = PermissionCode.valueOf(code);
		if (permissionCode == null) {
			throw new IllegalArgumentException("Invalid permission code: " + code);
		}
		return DEFINITIONS.get(permissionCode);
	};
}