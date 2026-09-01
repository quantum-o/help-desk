package com.quantum.modmail.ticket.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record SendTicketMessageRequest(
        @NotBlank(message = "Message cannot be empty")
        @Size(max = 2000, message = "Message must not exceed 2000 characters")
        String message,

        @Max(value = 10, message = "Maximum 10 files can be included")
        List<UUID> attachments
) {
}
