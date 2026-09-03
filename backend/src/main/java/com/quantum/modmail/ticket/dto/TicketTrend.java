package com.quantum.modmail.ticket.dto;

import java.time.LocalDate;

public record TicketTrend(
        LocalDate date,
        Long open,
        Long inProgress,
        Long resolved
) {
}
