package com.quantum.modmail.attachment.mapper;

import com.quantum.modmail.attachment.dto.AttachmentResponse;
import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AttachmentMapper {
    private final FileStorageService fileStorageService;

    public AttachmentResponse toResponse(Attachment attachment) {
        return AttachmentResponse.builder()
                .id(attachment.getId())
                .originalName(attachment.getOgName())
                .contentType(attachment.getContentType())
                .size(attachment.getSize())
                .url(fileStorageService.getUrl(attachment.getStorageKey()))
                .createdAt(attachment.getCreatedAt())
                .build();
    }
}
