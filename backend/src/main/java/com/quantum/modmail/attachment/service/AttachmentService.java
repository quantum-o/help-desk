package com.quantum.modmail.attachment.service;

import com.quantum.modmail.attachment.dto.AttachmentResource;
import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.repository.AttachmentRepository;
import com.quantum.modmail.attachment.service.storage.FileStorageService;
import com.quantum.modmail.ticket.entity.TicketMessage;
import com.quantum.modmail.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;
    private final FileStorageService fileStorageService;

    private final Set<String> allowedFileTypes = Set.of(
            "image/png",
            "image/jpeg",
            "application/pdf",
            "text/plain"
    );

    public Attachment save(
            MultipartFile file,
            TicketMessage ticketMessage,
            User user
    ) {
        validateContentType(file);

        String storageKey = fileStorageService.store(file, ticketMessage.getId().toString());

        Attachment attachment = Attachment.builder()
                .ogName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .size(file.getSize())
                .storageKey(storageKey)
                .uploadedBy(user)
                .ticketMessage(ticketMessage)
                .build();

        return attachmentRepository.save(attachment);
    }

    public AttachmentResource getAttachment(UUID id) {
        Attachment attachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Attachment not found"));

        Resource resource = fileStorageService.load(attachment.getStorageKey());

        return new AttachmentResource(attachment, resource);
    }

    private void validateContentType(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Couldn't find file");
        }

        if (!allowedFileTypes.contains(file.getContentType())) {
            throw new IllegalArgumentException("Invalid file type: " + file.getContentType());
        }
    }
}
