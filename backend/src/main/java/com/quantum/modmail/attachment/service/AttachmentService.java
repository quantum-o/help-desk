package com.quantum.modmail.attachment.service;

import com.quantum.modmail.attachment.dto.AttachmentResource;
import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.entity.AttachmentStatus;
import com.quantum.modmail.attachment.repository.AttachmentRepository;
import com.quantum.modmail.attachment.service.storage.FileStorageService;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    private final Set<String> allowedFileTypes = Set.of(
            "image/png",
            "image/jpeg",
            "application/pdf",
            "text/plain"
    );

    public Attachment save(
            MultipartFile file,
            String email
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "USER_NOT_FOUND",
                        "User not found."
                ));

        validateContentType(file);

        String storageKey = fileStorageService.store(file);

        Attachment attachment = Attachment.builder()
                .ogName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .size(file.getSize())
                .storageKey(storageKey)
                .uploadedBy(user)
                .status(AttachmentStatus.UPLOADED)
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
