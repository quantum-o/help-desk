package com.quantum.modmail.ticket;

import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    public Optional<List<Ticket>> findByCreatedBy(User createdBy);

    public Optional<List<Ticket>> findByAssignedTo(User assignedTo);
}
