package com.quantum.modmail.scheduler;

import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.entity.AttachmentStatus;
import com.quantum.modmail.attachment.repository.AttachmentRepository;
import com.quantum.modmail.attachment.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AttachmentCleaner {
    private final AttachmentRepository attachmentRepository;
    private final FileStorageService fileStorageService;

    private final Logger logger = LoggerFactory.getLogger(AttachmentCleaner.class);

    @Scheduled(cron = "0 0 9 * * Mon")
    public void clearUnusedAttachments() {
        List<Attachment> attachments = attachmentRepository.findAllByStatus(AttachmentStatus.UPLOADED);
        List<Attachment> deletedAttachments = new ArrayList<>();

        logger.info("Found {} unused file attachments", attachments.size());
        for (Attachment attachment : attachments) {
            try {
                fileStorageService.delete(attachment.getStorageKey());
                deletedAttachments.add(attachment);
            } catch (RuntimeException e) {
                if (e.getCause() instanceof NoSuchFileException) {
                    deletedAttachments.add(attachment);
                } else
                    logger.warn("Could not delete attachments {}", e.getMessage());
            }
        }

        attachmentRepository.deleteAll(deletedAttachments);
        logger.info("Removed {}/{} unused files and records", deletedAttachments.size(), attachments.size());
    }
}
