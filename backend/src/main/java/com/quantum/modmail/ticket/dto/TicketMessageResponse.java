package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.attachment.dto.AttachmentResponse;
import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Builder
public record TicketMessageResponse(UUID id,
                                    UUID senderId,
                                    String senderEmail,
                                    String message,
                                    List<AttachmentResponse> attachments,
                                    Instant createdAt,
                                    Instant updatedAt
) {
}
