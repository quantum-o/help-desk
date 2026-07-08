package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;

public record UpdateTicketRequest (
    String title,
    String description,
    TicketPriority priority,
    TicketStatus status)
{}
