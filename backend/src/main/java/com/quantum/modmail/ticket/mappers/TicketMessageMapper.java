package com.quantum.modmail.ticket.mappers;

import com.quantum.modmail.attachment.mapper.AttachmentMapper;
import com.quantum.modmail.ticket.dto.TicketMessageResponse;
import com.quantum.modmail.ticket.entity.TicketMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TicketMessageMapper {
    private final AttachmentMapper attachmentMapper;

    public TicketMessageResponse toResponse(TicketMessage ticketMessage) {
        return TicketMessageResponse.builder()
                .id(ticketMessage.getId())
                .senderId(ticketMessage.getSender().getId())
                .senderEmail(ticketMessage.getSender().getEmail())
                .message(ticketMessage.getMessage())
                .attachments(ticketMessage.getAttachments().stream().map(attachmentMapper::toResponse).toList())
                .createdAt(ticketMessage.getCreatedAt())
                .updatedAt(ticketMessage.getUpdatedAt())
                .build();
    }
}
