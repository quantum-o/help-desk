package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketRequest {
    private String title;
    private String description;
    private TicketPriority priority;
    private TicketStatus status;
}
