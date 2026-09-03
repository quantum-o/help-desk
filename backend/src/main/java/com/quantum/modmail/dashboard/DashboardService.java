package com.quantum.modmail.dashboard;

import com.quantum.modmail.dashboard.dto.DashboardResponse;
import com.quantum.modmail.dashboard.dto.StatisticRequest;
import com.quantum.modmail.ticket.dto.TicketTrend;
import com.quantum.modmail.ticket.dto.TicketStatusStatistics;
import com.quantum.modmail.ticket.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final TicketRepository ticketRepository;

    public DashboardResponse getDashboard(StatisticRequest statisticRequest) {
        TicketStatusStatistics statusStatistics = ticketRepository.getStatusStatistics();
        List<TicketTrend> ticketTrend = ticketRepository.getTicketTrend(statisticRequest.from(), statisticRequest.to());

        return DashboardResponse.builder()
                .openTickets(statusStatistics.openTickets())
                .inProgressTickets(statusStatistics.inProgressTickets())
                .resolvedTickets(statusStatistics.resolvedTickets())
                .trend(ticketTrend)
                .build();
    }
}
