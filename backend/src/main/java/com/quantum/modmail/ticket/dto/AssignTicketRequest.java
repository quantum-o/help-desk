package com.quantum.modmail.ticket.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AssignTicketRequest (
        @NotNull(message = "id cannot be null")
       UUID id
) {}
