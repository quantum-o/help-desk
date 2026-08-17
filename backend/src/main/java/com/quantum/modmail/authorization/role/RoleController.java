package com.quantum.modmail.authorization.role;

import com.quantum.modmail.authorization.role.dto.CreateRoleRequest;
import com.quantum.modmail.authorization.role.dto.RoleResponse;
import com.quantum.modmail.authorization.role.dto.UpdateRoleRequest;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.common.response.ApiResponse;
import com.quantum.modmail.security.RequiredPermission;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
	private final RoleService roleService;

	@GetMapping()
	@RequiredPermission(code = {PermissionCode.ROLE_READ})
	public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {
		List<RoleResponse> responses = roleService.getAllRoles();
		return ResponseEntity.ok(ApiResponse.ok("Success", responses));
	}

	@GetMapping("/{id}")
	@RequiredPermission(code = {PermissionCode.ROLE_READ})
	public ResponseEntity<ApiResponse<RoleResponse>> getRole(@PathVariable UUID id) {
		RoleResponse response = roleService.getRoleById(id);
		return ResponseEntity.ok(ApiResponse.ok("Success", response));
	}

	@PostMapping()
	@RequiredPermission(code = {PermissionCode.ROLE_CREATE})
	public ResponseEntity<ApiResponse<RoleResponse>> createRole(@Valid @RequestBody CreateRoleRequest request) {
		RoleResponse response = roleService.createRole(request);
		return ResponseEntity.ok(ApiResponse.ok("Success", response));
	}

	@PatchMapping("/{id}")
	@RequiredPermission(code = {PermissionCode.ROLE_UPDATE})
	public ResponseEntity<ApiResponse<RoleResponse>> updateRole(@PathVariable UUID id, @Valid @RequestBody UpdateRoleRequest request) {
		RoleResponse response = roleService.updateRole(id, request);
		return ResponseEntity.ok(ApiResponse.ok("Success", response));
	}

	@DeleteMapping("/{id}")
	@RequiredPermission(code = {PermissionCode.ROLE_DELETE})
	public ResponseEntity<ApiResponse<Null>> deleteRole(@PathVariable UUID id) {
		roleService.deleteRole(id);
		return ResponseEntity.ok(ApiResponse.ok("Success", null));
	}
}
