package com.quantum.modmail.attachment.dto;

import com.quantum.modmail.attachment.entity.Attachment;
import org.springframework.core.io.Resource;

public record AttachmentResource(
        Attachment attachment,
        Resource resource
) {
}
