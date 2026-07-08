package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTicketRequest (
    @NotBlank(message = "Title cannot be empty")
    String title,

    @NotBlank(message = "Description cannot be empty")
    String description,

    @NotNull(message = "Priority cannot be null")
    TicketPriority priority
) {}
