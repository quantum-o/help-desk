package com.quantum.modmail.ticket;

import com.quantum.modmail.common.response.ApiResponse;
import com.quantum.modmail.common.response.CursorResponse;
import com.quantum.modmail.ticket.dto.*;
import com.quantum.modmail.authorization.permission.entity.PermissionCode;
import com.quantum.modmail.security.RequiredPermission;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping("/create")
    @RequiredPermission(code = {PermissionCode.TICKET_CREATE})
    public ResponseEntity<ApiResponse<TicketResponse>> createTicket(@Valid @RequestBody CreateTicketRequest request, Authentication authentication) {
        String email = authentication.getName();

        TicketResponse response = ticketService.createTicket(request, email);
        return ResponseEntity.ok(ApiResponse.ok("Ticket created successfully", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<Page<TicketResponse>>> my(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size,
            Authentication authentication) {
        String email = authentication.getName();

        Page<TicketResponse> responses = ticketService.getMyTickets(email, page, size);
        return ResponseEntity.ok(ApiResponse.ok("Tickets retrieved successfully", responses));
    }

    @GetMapping()
    @RequiredPermission(code = {PermissionCode.TICKET_READ})
    public ResponseEntity<ApiResponse<Page<TicketResponse>>> getTickets(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Page<TicketResponse> response = ticketService.getTickets(email, page, size);
        return ResponseEntity.ok(ApiResponse.ok("Tickets retrieved successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TicketResponse>> getTicket(@PathVariable UUID id, Authentication authentication) {
        String email = authentication.getName();

        TicketResponse response = ticketService.getTicket(id, email);
        return ResponseEntity.ok(ApiResponse.ok("Ticket retrieved successfully", response));
    }

    @PatchMapping("/{id}/assign")
    @RequiredPermission(code = {PermissionCode.TICKET_UPDATE})
    public ResponseEntity<ApiResponse<String>> assign(
            @PathVariable UUID id,
            @RequestBody AssignTicketRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        ticketService.assignTicket(id, request, email);
        return ResponseEntity.ok(ApiResponse.ok("Ticket assigned successfully", null));
    }

    @PatchMapping("/{id}/update")
    @RequiredPermission(code = {PermissionCode.TICKET_UPDATE})
    public ResponseEntity<ApiResponse<TicketResponse>> update(
            @PathVariable UUID id,
            @RequestBody UpdateTicketRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        TicketResponse response = ticketService.updateTicket(id, request, email);
        return ResponseEntity.ok(ApiResponse.ok("Ticket updated successfully", response));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<ApiResponse<TicketMessageResponse>> post(
            @PathVariable UUID id,
            @Valid @RequestBody SendTicketMessageRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        TicketMessageResponse response = ticketService.addMessage(id, request, email);
        return ResponseEntity.ok(ApiResponse.ok("Ticket message sent successfully", response));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<ApiResponse<CursorResponse<TicketMessageResponse>>> getMessages(
            @PathVariable UUID id,
            @RequestParam(required = false) String cursor,
            @RequestParam(required = false, defaultValue = "20") int size,
            Authentication authentication
    ) {
        String email = authentication.getName();

        CursorResponse<TicketMessageResponse> response = ticketService.getMessages(id, email, cursor, size);
        return ResponseEntity.ok(ApiResponse.ok("Ticket messages retrieved successfully", response));
    }
}
