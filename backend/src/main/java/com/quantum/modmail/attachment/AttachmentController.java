package com.quantum.modmail.attachment;

import com.quantum.modmail.attachment.dto.AttachmentResource;
import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/attachments")
@RequiredArgsConstructor
public class AttachmentController {
    private final AttachmentService attachmentService;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getAttachment(@PathVariable UUID id) {
        AttachmentResource res = attachmentService.getAttachment(id);
        Attachment attachment = res.attachment();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + attachment.getOgName() + "\"")
                .body(res.resource());
    }

}