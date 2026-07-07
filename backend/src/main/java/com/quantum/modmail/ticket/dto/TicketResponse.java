package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class TicketResponse {
    private UUID id;
    private String title;
    private String description;
    private TicketStatus status;
    private TicketPriority priority;
}
