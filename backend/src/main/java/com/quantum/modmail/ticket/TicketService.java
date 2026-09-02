package com.quantum.modmail.ticket;

import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.attachment.entity.AttachmentStatus;
import com.quantum.modmail.attachment.repository.AttachmentRepository;
import com.quantum.modmail.common.CursorUtil;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.common.response.CursorResponse;
import com.quantum.modmail.ticket.dto.*;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketMessage;
import com.quantum.modmail.ticket.entity.TicketStatus;
import com.quantum.modmail.ticket.mappers.TicketMapper;
import com.quantum.modmail.ticket.mappers.TicketMessageMapper;
import com.quantum.modmail.ticket.repositories.TicketMessageRepository;
import com.quantum.modmail.ticket.repositories.TicketRepository;
import com.quantum.modmail.ticket.repositories.TicketSpecifications;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TicketService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final TicketMessageRepository ticketMessageRepository;
    private final AttachmentRepository attachmentRepository;

    private final TicketMessageMapper ticketMessageMapper;

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

        TicketMessage firstMessage = TicketMessage.builder()
                .ticket(ticket)
                .message(request.description())
                .sender(ticketCreator)
                .build();

        ticketMessageRepository.save(firstMessage);

        processMessageAttachments(request.attachments(), firstMessage, ticketCreator.getId());

        return TicketMapper.toResponse(createdTicket);
    }

    public Page<TicketResponse> getMyTickets(
            String email,
            @PageableDefault(
                    sort = "created_at",
                    direction = Sort.Direction.DESC
            ) Pageable pageable,
            TicketFilter filter) {
        User user = getUserByEmail(email);

        Specification<Ticket> specification = Specification
                .where(TicketSpecifications.query(filter.q()))
                .and(TicketSpecifications.hasStatus(filter.status()))
                .and(TicketSpecifications.hasPriority(filter.priority()))
                .and(TicketSpecifications.hasCategory(filter.categoryId()))
                .and(TicketSpecifications.hasAssignee(filter.assigneeId()))
                .and(TicketSpecifications.createdBetween(
                        filter.createdFrom(),
                        filter.createdTo()
                ));

        return ticketRepository.findByCreatedBy(user, pageable, specification).map(TicketMapper::toResponse);
    }

    public Page<TicketResponse> getTickets(
            String email,
            Pageable pageable,
            TicketFilter filter) {
        User user = getUserByEmail(email);

        Specification<Ticket> specification = Specification
                .where(TicketSpecifications.query(filter.q()))
                .and(TicketSpecifications.hasStatus(filter.status()))
                .and(TicketSpecifications.hasPriority(filter.priority()))
                .and(TicketSpecifications.hasCategory(filter.categoryId()))
                .and(TicketSpecifications.hasAssignee(filter.assigneeId()))
                .and(TicketSpecifications.createdBetween(
                        filter.createdFrom(),
                        filter.createdTo()
                ));

        Pageable sortedPage = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));

        return ticketRepository.findAll(specification, sortedPage).map(TicketMapper::toResponse);
    }

    public TicketResponse getTicket(UUID id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        if (!TicketAuthorization.canRead(ticket, user.getId()))
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                    "You do not have permission to access this ticket");

        return TicketMapper.toResponse(ticket);
    }

    public void assignTicket(@NotNull UUID ticketId, AssignTicketRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        User targetUser = userRepository.findById(request.id())
                .orElseThrow(
                        () -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "Target user not found"));

        ticket.setAssignedTo(targetUser);
        ticketRepository.save(ticket);
    }

    public TicketResponse updateTicket(@NotNull UUID ticketId, UpdateTicketRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        if (!TicketAuthorization.canUpdate(ticket, user.getId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                    "You do not have permission to update tickets");
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

        return TicketMapper.toResponse(savedTicket);
    }

    public TicketMessageResponse addMessage(UUID ticketId, SendTicketMessageRequest request, String email) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        if (!TicketAuthorization.canSendMessage(ticket, user.getId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                    "You do not have permission to send messages to this ticket");
        }

        TicketMessage ticketMessage = TicketMessage.builder()
                .ticket(ticket)
                .sender(user)
                .message(request.message())
                .build();

        TicketMessage savedMessage = ticketMessageRepository.save(ticketMessage);

        processMessageAttachments(request.attachments(), savedMessage, user.getId());
        return ticketMessageMapper.toResponse(savedMessage);
    }

    public CursorResponse<TicketMessageResponse> getMessages(UUID id, String email, String cursor, int size) {
        User user = getUserByEmail(email);

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "TICKET_NOT_FOUND", "Ticket not found"));

        if (!TicketAuthorization.canRead(ticket, user.getId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                    "You do not have permission to send messages to this ticket");
        }

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

        List<TicketMessageResponse> response = messages.stream().map(ticketMessageMapper::toResponse).toList();

        return CursorResponse.of(response, hasMore, nextCursor);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));
    }

    private void processMessageAttachments(List<UUID> attachmentList, TicketMessage ticketMessage, UUID ticketCreator) {
        try {
            if (attachmentList != null && !attachmentList.isEmpty()) {
                List<Attachment> attachments =
                        attachmentRepository.findAllById(attachmentList);

                if (attachments.size() != attachmentList.size()) {
                    throw new BusinessException(HttpStatus.BAD_REQUEST, "UPLOADED_FILE_NOT_FOUND", "One or more files are missing");
                }

                for (Attachment attachment : attachments) {
                    if (!attachment.getUploadedBy().getId().equals(ticketCreator)) {
                        throw new BusinessException(HttpStatus.UNAUTHORIZED, "ACCESS_DENIED", "Attachment does not belong to user");
                    }

                    if (attachment.getStatus() != AttachmentStatus.UPLOADED) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST, "UPLOADED_FILE_ALREADY_ATTACHED", "This attachment can no longer usable");
                    }

                    attachment.setTicketMessage(ticketMessage);
                    attachment.setStatus(AttachmentStatus.ATTACHED);
                }

                ticketMessage.setAttachments(new HashSet<>(attachments));
                attachmentRepository.saveAll(attachments);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
