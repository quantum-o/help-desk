package com.quantum.modmail.ticket;

import com.quantum.modmail.common.CursorUtil;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.common.response.CursorResponse;
import com.quantum.modmail.ticket.dto.*;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketMessage;
import com.quantum.modmail.ticket.entity.TicketStatus;
import com.quantum.modmail.ticket.mappers.TicketMapper;
import com.quantum.modmail.ticket.repositories.TicketMessageRepository;
import com.quantum.modmail.ticket.repositories.TicketRepository;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final TicketMessageRepository ticketMessageRepository;

    public TicketResponse createTicket(CreateTicketRequest request, String email) {
        User ticketCreator = getUserByEmail(email);

        Ticket ticket = Ticket.builder()
                .title(request.title())
                .description(request.description())
                .priority(request.priority())
                .status(TicketStatus.OPEN)
                .createdBy(ticketCreator)
                .assignedTo(null)
                .build();

        Ticket createdTicket = ticketRepository.save(ticket);

        return TicketMapper.toResponse(createdTicket);
    }

    public Page<TicketResponse> getMyTickets(String email, int page, int size) {
        User user = getUserByEmail(email);

        Pageable pageable = PageRequest.of(page, size);
        return ticketRepository.findByCreatedBy(user, pageable).map(TicketMapper::toResponse);
    }

    public Page<TicketResponse> getTickets(String email, int page, int size) {
        User user = getUserByEmail(email);

        Pageable pageable = PageRequest.of(page, size);
        Page<TicketResponse> response = ticketRepository.findAll(pageable).map(TicketMapper::toResponse);

        return response;
    }

    public TicketResponse getTicket(UUID id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));
//
//        boolean isAdmin = user.getRole() == UserRole.ADMIN;
//        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
//        boolean isAssignedAgent = user.getRole() == UserRole.AGENT &&
//                ticket.getAssignedTo() != null &&
//                ticket.getAssignedTo().getId().equals(user.getId());

//        if (!isAdmin && !isOwner && !isAssignedAgent)
//            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
//                    "You do not have permission to access this ticket");

        return TicketMapper.toResponse(ticket);
    }

    public void assignTicket(@NotNull UUID ticketId, AssignTicketRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        User targetUser = userRepository.findById(request.id())
                .orElseThrow(
                        () -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "Target user not found"));

//        if (targetUser.getRole() != UserRole.AGENT) {
//            throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_USER_ROLE", "Target user must be an agent");
//        }

        ticket.setAssignedTo(targetUser);
        ticketRepository.save(ticket);
    }

    public TicketResponse updateTicket(@NotNull UUID ticketId, UpdateTicketRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

//        boolean isAdmin = user.getRole() == UserRole.ADMIN;
//        boolean isAssignedAgent = user.getRole() == UserRole.AGENT
//                && ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());
//
//        if (!isAdmin && !isAssignedAgent) {
//            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
//                    "You do not have permission to update tickets");
//        }

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

        return TicketMapper.toResponse(savedTicket);
    }

    public TicketMessageResponse addMessage(UUID ticketId, SendTicketMessageRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

//        boolean isAdmin = user.getRole() == UserRole.ADMIN;
//        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
//        boolean isAssignedAgent = user.getRole() == UserRole.AGENT &&
//                ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());
//
//        if (!isAdmin && !isOwner && !isAssignedAgent) {
//            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
//                    "You do not have permission to send messages to this ticket");
//        }

        TicketMessage ticketMessage = TicketMessage.builder()
                .ticket(ticket)
                .sender(user)
                .message(request.message())
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
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

//        boolean isAdmin = user.getRole() == UserRole.ADMIN;
//        boolean isOwner = ticket.getCreatedBy().getId().equals(user.getId());
//        boolean isAssignedAgent = user.getRole() == UserRole.AGENT &&
//                ticket.getAssignedTo() != null && ticket.getAssignedTo().getId().equals(user.getId());
//
//        if (!isAdmin && !isOwner && !isAssignedAgent) {
//            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
//                    "You do not have permission to send messages to this ticket");
//        }

        List<TicketMessage> messages;

        Pageable pageable = PageRequest.of(0, size + 1);
        if (cursor == null || cursor.isBlank()) {
            messages = ticketMessageRepository.findByTicketOrderByCreatedAtDesc(ticket, pageable).getContent();
        } else {
            CursorUtil.DecodedCursor decodedCursor;
            try {
                decodedCursor = CursorUtil.decodeCursor(cursor);
            } catch (IllegalArgumentException e) {
                throw new BusinessException(HttpStatus.BAD_REQUEST, "INVALID_CURSOR", "Cursor must be a valid string");
            }

            messages = ticketMessageRepository.findByTicketAndOrderByCreatedAtDescWithCursor(ticket,
                    decodedCursor.createdAt(), decodedCursor.id(), pageable);
        }

        String nextCursor = null;
        boolean hasMore = messages.size() > size;

        if (hasMore) {
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

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));
    }
}
