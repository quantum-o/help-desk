package com.quantum.modmail.category.dto;

import jakarta.annotation.Nullable;

public record CategoryPatchRequest(String name, @Nullable Long parent) {
}
