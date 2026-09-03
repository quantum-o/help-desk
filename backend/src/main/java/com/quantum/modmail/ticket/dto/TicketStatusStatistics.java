package com.quantum.modmail.ticket.dto;

public record TicketStatusStatistics (
        Long openTickets,
        Long inProgressTickets,
        Long resolvedTickets
) {
}
