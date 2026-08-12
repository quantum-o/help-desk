package com.quantum.modmail.category.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record CategoryResponse(
        Long id,
        String name,
        boolean passive,
        List<CategoryResponse> children
) {
}
