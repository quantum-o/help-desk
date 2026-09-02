package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;

import java.time.Instant;
import java.util.UUID;

public record TicketFilter(
        String q,
        TicketStatus status,
        TicketPriority priority,
        Long categoryId,
        UUID assigneeId,
        Instant createdFrom,
        Instant createdTo
) {
}
