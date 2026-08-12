package com.quantum.modmail.category.dto;

public record CategoryPatchRequest(String name, Long parent, Boolean passive) {
}
