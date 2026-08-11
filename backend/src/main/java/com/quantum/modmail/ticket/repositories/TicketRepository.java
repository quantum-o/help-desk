package com.quantum.modmail.ticket.repositories;

import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.user.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    Optional<List<Ticket>> findByCreatedBy(User createdBy);

    Page<Ticket> findByCreatedBy(User createdBy, Pageable pagable);

    Optional<List<Ticket>> findByAssignedTo(User assignedTo);
}
