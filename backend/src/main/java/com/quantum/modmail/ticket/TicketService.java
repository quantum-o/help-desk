package com.quantum.modmail.ticket;

import com.quantum.modmail.common.CursorUtil;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.common.response.CursorResponse;
import com.quantum.modmail.ticket.dto.*;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketMessage;
import com.quantum.modmail.ticket.entity.TicketStatus;
import com.quantum.modmail.ticket.repositories.TicketMessageRepository;
import com.quantum.modmail.ticket.repositories.TicketRepository;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.entity.UserRole;
import com.quantum.modmail.user.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final TicketMessageRepository ticketMessageRepository;

    public TicketResponse createTicket(CreateTicketRequest request, String userEmail) {
        User ticketCreator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = Ticket.builder()
                .title(request.title())
                .description(request.description())
                .priority(request.priority())
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
                .createdBy(ticket.getCreatedBy().getId())
                .build();
    }

    public void assignTicket(@NotNull UUID ticketId, AssignTicketRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        if (user.getRole() != UserRole.ADMIN) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to assign tickets");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        User targetUser = userRepository.findById(request.id())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "Target user not found"));

        if(targetUser.getRole() != UserRole.AGENT) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_USER_ROLE", "Target user must be an agent");
        }

        ticket.setAssignedTo(targetUser);
        ticketRepository.save(ticket);
    }

    public TicketResponse updateTicket(@NotNull UUID ticketId, UpdateTicketRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        boolean isAdmin = user.getRole() == UserRole.ADMIN;
        boolean isAssignedAgent = user.getRole() == UserRole.AGENT
                && ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());

        if (!isAdmin && !isAssignedAgent) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to update tickets");
        }

        if (request.title() != null) {
            ticket.setTitle(request.title());
        }
        if (request.description() != null) {
            ticket.setDescription(request.description());
        }
        if (request.priority() != null) {
            ticket.setPriority(request.priority());
        }
        if (request.status() != null) {
            ticket.setStatus(request.status());
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

    public TicketMessageResponse addMessage(UUID ticketId, SendTicketMessageRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        boolean isAdmin = user.getRole() == UserRole.ADMIN;
        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
        boolean isAssignedAgent =
                user.getRole() == UserRole.AGENT &&
                ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());

        if (!isAdmin && !isOwner && !isAssignedAgent) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to send messages to this ticket");
        }

        TicketMessage ticketMessage = TicketMessage.builder()
                .ticket(ticket)
                .sender(user)
                .message(request.message())
                .createdAt(Instant.now())
                .build();

        TicketMessage savedMessage = ticketMessageRepository.save(ticketMessage);

        return TicketMessageResponse.builder()
                .id(savedMessage.getId())
                .senderId(savedMessage.getSender().getId())
                .senderEmail(savedMessage.getSender().getEmail())
                .message(savedMessage.getMessage())
                .createdAt(savedMessage.getCreatedAt())
                .build();
    }

    public CursorResponse<TicketMessageResponse> getMessages(UUID id, String email, String cursor, int size) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        boolean isAdmin = user.getRole() == UserRole.ADMIN;
        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
        boolean isAssignedAgent =
                user.getRole() == UserRole.AGENT &&
                        ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());

        if (!isAdmin && !isOwner && !isAssignedAgent) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "You do not have permission to send messages to this ticket");
        }

        List<TicketMessage> messages;

        Pageable pageable = PageRequest.of(0, size + 1);
        if (cursor == null || cursor.isBlank()) {
            messages = ticketMessageRepository.findByTicketOrderByCreatedAtDesc(ticket, pageable).getContent();
        }
        else {
            CursorUtil.DecodedCursor decodedCursor;
            try {
                decodedCursor = CursorUtil.decodeCursor(cursor);
            } catch (IllegalArgumentException e) {
                throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_CURSOR", "Cursor must be a valid string");
            }

            messages = ticketMessageRepository.findByTicketAndOrderByCreatedAtDescWithCursor(ticket, decodedCursor.createdAt(), decodedCursor.id(), pageable);
        }

        String nextCursor = null;
        boolean hasMore = messages.size() > size;

        if(hasMore) {
            messages = messages.subList(0, size);

            TicketMessage lastMessage = messages.getLast();
            nextCursor = CursorUtil.encodeCursor(lastMessage.getCreatedAt(), lastMessage.getId());
        }

        List<TicketMessageResponse> response = messages.stream().map(message -> TicketMessageResponse.builder()
                .id(message.getId())
                .senderId(message.getSender().getId())
                .senderEmail(message.getSender().getEmail())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build()).toList();

        return CursorResponse.of(response, hasMore, nextCursor);
    }
}
