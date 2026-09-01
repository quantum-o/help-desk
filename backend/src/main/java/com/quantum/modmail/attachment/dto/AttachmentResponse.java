package com.quantum.modmail.attachment.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record AttachmentResponse(
        UUID id,
        String originalName,
        String contentType,
        Long size,
        String url
) {
}
