package com.quantum.modmail.ticket.repositories;

import com.quantum.modmail.ticket.dto.TicketTrend;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.dto.TicketStatusStatistics;
import com.quantum.modmail.user.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    Optional<List<Ticket>> findByCreatedBy(User createdBy);

    Page<Ticket> findByCreatedBy(User createdBy, Pageable pageable);

    Page<Ticket> findByCreatedBy(User createdBy, Pageable pageable, Specification<Ticket> specification);

    Optional<List<Ticket>> findByAssignedTo(User assignedTo);

    Page<Ticket> findAll(Specification<Ticket> specification, Pageable pageable);

    @Query("""
                SELECT new com.quantum.modmail.ticket.dto.TicketStatusStatistics(
                    COUNT(CASE WHEN t.status = 'OPEN' THEN 1 END),
                    COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END),
                    COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END)
                )
                FROM Ticket t
            """)
    TicketStatusStatistics getStatusStatistics();

    @Query(value = """
            SELECT
                DATE(t.created_at) AS date,
                COUNT(CASE WHEN t.status = 'OPEN' THEN 1 END) AS open,
                COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END) AS inProgress,
                COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END) AS resolved
            FROM tickets t
            WHERE t.created_at >= :from
              AND t.created_at < :to
            GROUP BY DATE(t.created_at)
            ORDER BY DATE(t.created_at)
            """, nativeQuery = true)
    List<TicketTrend> getTicketTrend(
            Instant from,
            Instant to
    );
}
