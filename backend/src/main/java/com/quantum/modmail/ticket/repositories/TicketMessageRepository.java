package com.quantum.modmail.ticket.repositories;

import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.ScrollPosition;
import org.springframework.data.domain.Window;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface TicketMessageRepository extends JpaRepository<TicketMessage, UUID> {
    Page<TicketMessage> findByTicketOrderByCreatedAtDesc(Ticket ticket, Pageable pageable);

    @Query("SELECT m FROM TicketMessage m " +
            "WHERE m.ticket = :ticketId " +
            "AND (m.createdAt < :createdAt OR (m.createdAt = :createdAt AND m.id < :id)) " +
            "ORDER BY m.createdAt DESC, m.id DESC")
    List<TicketMessage> findByTicketAndOrderByCreatedAtDescWithCursor(@Param("ticketId") Ticket ticket,
                                     @Param("createdAt") Instant createdAt,
                                     @Param("id") UUID id,
                                     Pageable pageable);

    Window<TicketMessage> findByTicketOrderByCreatedAtDesc(Ticket ticket, ScrollPosition scrollPosition);
}
