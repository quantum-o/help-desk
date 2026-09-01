package com.quantum.modmail.attachment.mapper;

import com.quantum.modmail.attachment.dto.AttachmentResponse;
import com.quantum.modmail.attachment.entity.Attachment;

public class AttachmentMapper {
    public static AttachmentResponse toResponse(Attachment attachment) {
        return AttachmentResponse.builder()
                .id(attachment.getId())
                .originalName(attachment.getOgName())
                .contentType(attachment.getContentType())
                .size(attachment.getSize())
                .url(attachment.getStorageKey())
                .createdAt(attachment.getCreatedAt())
                .build();
    }
}
