package com.quantum.modmail.category.dto;

import jakarta.annotation.Nullable;

public record CategoryPatchRequest(Long id, String name, @Nullable Long parent) {
}
