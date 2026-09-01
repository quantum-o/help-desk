package com.quantum.modmail.attachment.entity;

import com.quantum.modmail.ticket.entity.TicketMessage;
import com.quantum.modmail.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "attachments")
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private String ogName;

    @Column
    private String ogDescription;

    @Column
    private String contentType;

    @Column
    private Long size;

    @Column(unique = true)
    private String storageKey;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttachmentStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticketMessage_id")
    private TicketMessage ticketMessage;
}
