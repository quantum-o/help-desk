package com.quantum.modmail.ticket.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AssignTicketRequest {
    @NotNull
    private UUID id;
}
