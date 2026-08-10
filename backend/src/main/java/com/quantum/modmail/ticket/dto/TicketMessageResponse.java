package com.quantum.modmail.ticket.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record TicketMessageResponse(UUID id,
                                    UUID senderId,
                                    String senderEmail,
                                    String message,
                                    Instant createdAt,
                                    Instant updatedAt
) {
}
