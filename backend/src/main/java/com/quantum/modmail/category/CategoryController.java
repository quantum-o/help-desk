package com.quantum.modmail.category;

import com.quantum.modmail.category.dto.CategoryCreateRequest;
import com.quantum.modmail.category.dto.CategoryPatchRequest;
import com.quantum.modmail.category.dto.CategoryResponse;
import com.quantum.modmail.common.response.ApiResponse;
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
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> get() {
        List<CategoryResponse> response = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> post(@Valid @RequestBody CategoryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Success", categoryService.addNewCategory(request)));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> patch(@Valid @RequestBody CategoryPatchRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Success", categoryService.updateCategory(request)));
    }
}
