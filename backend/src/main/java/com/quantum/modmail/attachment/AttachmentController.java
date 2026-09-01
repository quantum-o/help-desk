package com.quantum.modmail.attachment;

import com.quantum.modmail.attachment.dto.AttachmentResource;
import com.quantum.modmail.attachment.dto.AttachmentResponse;
import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.mapper.AttachmentMapper;
import com.quantum.modmail.attachment.service.AttachmentService;
import com.quantum.modmail.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<AttachmentResponse>>> postAttachment(
            @RequestPart(value = "attachments", required = false) List<MultipartFile> attachments,
            Authentication authentication
    ) {
        String email = authentication.getName();
        Set<Attachment> savedAttachments = new HashSet<>();

        for (MultipartFile attachment : attachments) {
            Attachment savedAttachment = attachmentService.save(attachment, email);
            savedAttachments.add(savedAttachment);
        }

        List<AttachmentResponse> response = savedAttachments.stream().map(AttachmentMapper::toResponse).toList();
        return ResponseEntity.ok(ApiResponse.ok("Success", response));
    }
}