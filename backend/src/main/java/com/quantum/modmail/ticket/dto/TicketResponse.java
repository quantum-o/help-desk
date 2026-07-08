package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
public record TicketResponse (
        UUID id,
        String title,
        String description,
        TicketStatus status,
        TicketPriority priority
) {}
