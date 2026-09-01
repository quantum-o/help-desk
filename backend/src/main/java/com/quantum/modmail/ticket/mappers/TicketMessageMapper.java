package com.quantum.modmail.ticket.mappers;

import com.quantum.modmail.attachment.mapper.AttachmentMapper;
import com.quantum.modmail.ticket.dto.TicketMessageResponse;
import com.quantum.modmail.ticket.entity.TicketMessage;

public class TicketMessageMapper {
    public static TicketMessageResponse toResponse(TicketMessage ticketMessage) {
        return TicketMessageResponse.builder()
                .id(ticketMessage.getId())
                .senderId(ticketMessage.getSender().getId())
                .senderEmail(ticketMessage.getSender().getEmail())
                .message(ticketMessage.getMessage())
                .attachments(ticketMessage.getAttachments().stream().map(AttachmentMapper::toResponse).toList())
                .createdAt(ticketMessage.getCreatedAt())
                .updatedAt(ticketMessage.getUpdatedAt())
                .build();
    }
}
