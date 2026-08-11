package com.quantum.modmail.category.mapper;

import com.quantum.modmail.category.dto.CategoryResponse;
import com.quantum.modmail.category.entity.Category;

public class CategoryMapper {
    public static CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .children(category.getChildren()
                        .stream()
                        .map(CategoryMapper::toResponse)
                        .toList())
                .build();
    }
}
