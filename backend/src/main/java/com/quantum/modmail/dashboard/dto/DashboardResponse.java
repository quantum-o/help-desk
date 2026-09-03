package com.quantum.modmail.dashboard.dto;

import com.quantum.modmail.ticket.dto.TicketTrend;
import lombok.Builder;

import java.util.List;

@Builder
public record DashboardResponse(
        Long openTickets,
        Long inProgressTickets,
        Long resolvedTickets,
        List<TicketTrend> trend
) {
}
