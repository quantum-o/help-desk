package com.quantum.modmail.ticket;

import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.ticket.dto.AssignTicketRequest;
import com.quantum.modmail.ticket.dto.CreateTicketRequest;
import com.quantum.modmail.ticket.dto.TicketResponse;
import com.quantum.modmail.ticket.dto.UpdateTicketRequest;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketStatus;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.entity.UserRole;
import com.quantum.modmail.user.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    public TicketResponse createTicket(CreateTicketRequest request, String userEmail) {
        User ticketCreator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(TicketStatus.OPEN)
                .createdBy(ticketCreator)
                .assignedTo(null)
                .build();

        ticketRepository.save(ticket);

        return TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .build();
    }

    public Optional<List<TicketResponse>> getMyTickets(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "USER_NOT_FOUND", "User not found"));

        return ticketRepository.findByCreatedBy(user)
                .map(tickets -> tickets.stream()
                        .map(ticket -> TicketResponse.builder()
                                .id(ticket.getId())
                                .title(ticket.getTitle())
                                .description(ticket.getDescription())
                                .status(ticket.getStatus())
                                .priority(ticket.getPriority())
                                .build())
                        .toList());
    }

    public TicketResponse getTicket(UUID id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        boolean isAdmin = user.getRole() == UserRole.ADMIN;
        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
        boolean isAssignedAgent =
                user.getRole() == UserRole.AGENT &&
                        ticket.getAssignedTo() != null &&
                        ticket.getAssignedTo().getId().equals(user.getId());

        if (!isAdmin && !isOwner && !isAssignedAgent)
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to access this ticket");

        return TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .build();
    }

    public void assignTicket(@NotNull UUID ticketId, AssignTicketRequest request, String email) {
        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        if (adminUser.getRole() != UserRole.ADMIN) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to assign tickets");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        User targetUser = userRepository.findById(request.getId())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "Target user not found"));

        if(targetUser.getRole() != UserRole.AGENT) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_USER_ROLE", "Target user must be an agent");
        }

        ticket.setAssignedTo(targetUser);
        ticketRepository.save(ticket);
    }

    public TicketResponse updateTicket(@NotNull UUID ticketId, UpdateTicketRequest request, String email) {
        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        boolean isAdmin = adminUser.getRole() == UserRole.ADMIN;
        boolean isAssignedAgent = adminUser.getRole() == UserRole.AGENT
                && ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(adminUser.getId());

        if (!isAdmin && !isAssignedAgent) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to update tickets");
        }

        if (request.getTitle() != null) {
            ticket.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            ticket.setDescription(request.getDescription());
        }
        if (request.getPriority() != null) {
            ticket.setPriority(request.getPriority());
        }
        if (request.getStatus() != null) {
            ticket.setStatus(request.getStatus());
        }
        
        Ticket savedTicket = ticketRepository.save(ticket);

        return TicketResponse.builder()
                .id(savedTicket.getId())
                .title(savedTicket.getTitle())
                .description(savedTicket.getDescription())
                .status(savedTicket.getStatus())
                .priority(savedTicket.getPriority())
                .build();
    }
//
//    public TicketResponse closeTicket(UUID id, String email) {
//    }
}
