package com.quantum.modmail.category.dto;

import jakarta.annotation.Nullable;

public record CategoryCreateRequest(String name, @Nullable Long parent) {
}
