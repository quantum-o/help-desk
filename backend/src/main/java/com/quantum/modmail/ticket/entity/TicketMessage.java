package com.quantum.modmail.ticket.entity;

import com.quantum.modmail.attachment.entity.Attachment;
import com.quantum.modmail.common.entity.BaseEntity;
import com.quantum.modmail.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ticket_messages", indexes = {
        @Index(name = "idx_ticket_created_id", columnList = "ticket_id, created_at DESC, id DESC")
})
public class TicketMessage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @OneToMany(mappedBy = "ticketMessage", fetch = FetchType.LAZY)
    private Set<Attachment> attachments;
}
