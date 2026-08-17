package com.quantum.modmail.category;

import com.quantum.modmail.category.dto.CategoryCreateRequest;
import com.quantum.modmail.category.dto.CategoryPatchRequest;
import com.quantum.modmail.category.dto.CategoryResponse;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.common.response.ApiResponse;
import com.quantum.modmail.security.RequiredPermission;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    @RequiredPermission(code = {PermissionCode.CATEGORY_READ})
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> get() {
        List<CategoryResponse> response = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }

    @PostMapping
    @RequiredPermission(code = {PermissionCode.CATEGORY_CREATE})
    public ResponseEntity<ApiResponse<CategoryResponse>> post(@Valid @RequestBody CategoryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Success", categoryService.addNewCategory(request)));
    }

    @PatchMapping("/{id}")
    @RequiredPermission(code = {PermissionCode.CATEGORY_UPDATE})
    public ResponseEntity<ApiResponse<CategoryResponse>> patch(@Valid @RequestBody CategoryPatchRequest request, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Success", categoryService.updateCategory(id, request)));
    }

    @DeleteMapping("/{id}")
    @RequiredPermission(code = {PermissionCode.CATEGORY_DELETE})
    public ResponseEntity<Void> delete(@Valid @PathVariable Long id) {
        categoryService.deleteCategory(id);

        return ResponseEntity.noContent().build();
    }
}
