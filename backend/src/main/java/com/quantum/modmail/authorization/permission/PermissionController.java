package com.quantum.modmail.authorization.permission;

import com.quantum.modmail.authorization.permission.dto.CreatePermissionRequest;
import com.quantum.modmail.authorization.permission.dto.PermissionResponse;
import com.quantum.modmail.authorization.permission.dto.UpdatePermissionRequest;
import com.quantum.modmail.authorization.permission.entity.Permission;
import com.quantum.modmail.common.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> getAllPermissions() {
        List<PermissionResponse> responses = permissionService.getAllPermissions();
        return ResponseEntity.ok(ApiResponse.ok("Success", responses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PermissionResponse>> getPermission(@PathVariable Long id) {
        PermissionResponse response = permissionService.getPermissionById(id);
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<PermissionResponse>> createPermission(@Valid @RequestBody CreatePermissionRequest request) {
        PermissionResponse response = permissionService.createPermission(request);
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<PermissionResponse>> updatePermission(@PathVariable Long id, @Valid @RequestBody UpdatePermissionRequest request) {
        PermissionResponse response = permissionService.updatePermission(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Null>> deletePermission(@PathVariable Long id) {
        permissionService.deletePermission(id);
        return ResponseEntity.ok(ApiResponse.ok("Success", null));
    }
}
