package com.quantum.modmail.ticket.mappers;

import com.quantum.modmail.category.CategoryService;
import com.quantum.modmail.ticket.dto.TicketResponse;
import com.quantum.modmail.ticket.entity.Ticket;

public class TicketMapper {
    public static TicketResponse toResponse(Ticket ticket) {
        return TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .category(ticket.getCategory() != null ? CategoryService.buildCategoryBreadcrumbs(ticket.getCategory()) : "No category")
                .priority(ticket.getPriority())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .createdBy(ticket.getCreatedBy().getId())
                .status(ticket.getStatus())
                .build();
    }
}
