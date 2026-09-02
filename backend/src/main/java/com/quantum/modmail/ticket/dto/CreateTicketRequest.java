package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record CreateTicketRequest(
        @NotBlank(message = "Title cannot be empty")
        String title,

        @NotBlank(message = "Description cannot be empty")
        String description,

        @NotNull(message = "Category should be specified")
        Long category,

        @NotNull(message = "Priority cannot be null")
        TicketPriority priority,

        @Size(max = 10, message = "Maximum 10 files can be included")
        List<UUID> attachments
) {
}
