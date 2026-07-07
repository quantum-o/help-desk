package com.quantum.modmail.ticket.dto;

import com.quantum.modmail.ticket.entity.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTicketRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private TicketPriority priority;
}
