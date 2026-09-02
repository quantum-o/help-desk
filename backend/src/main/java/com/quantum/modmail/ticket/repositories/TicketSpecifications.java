package com.quantum.modmail.ticket.repositories;

import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.util.UUID;

public class TicketSpecifications {
    public static Specification<Ticket> query(String filter) {
        return (root, query, criteriaBuilder) ->
                filter == null
                        ? null
                        : criteriaBuilder.like(
                        criteriaBuilder.trim(criteriaBuilder.lower(root.get("title"))),
                        "%" + filter.toLowerCase().trim() + "%"
                );
    }

    public static Specification<Ticket> hasStatus(TicketStatus status) {
        return (root, query, criteriaBuilder) ->
                status == null
                        ? null
                        : criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Ticket> hasPriority(TicketPriority priority) {
        return (root, query, criteriaBuilder) ->
                priority == null
                        ? null
                        : criteriaBuilder.equal(root.get("priority"), priority);
    }

    public static Specification<Ticket> hasCategory(Long categoryId) {
        return (root, query, criteriaBuilder) ->
                categoryId == null
                        ? null
                        : criteriaBuilder.equal(root.get("category"), categoryId);
    }

    public static Specification<Ticket> hasAssignee(UUID userId) {
        return (root, query, criteriaBuilder) ->
                userId == null
                        ? null
                        : criteriaBuilder.equal(root.get("assigned_to"), userId);
    }

    public static Specification<Ticket> createdBetween(Instant createdFrom, Instant createdTo) {
        return ((root, query, criteriaBuilder) ->
        {
            if (createdFrom == null && createdTo == null) {
                return null;
            }

            if (createdFrom == null) {
                return criteriaBuilder.lessThan(
                        root.get("createdAt"),
                        createdTo
                );
            }

            if (createdTo == null) {
                return criteriaBuilder.greaterThan(
                        root.get("createdAt"),
                        createdFrom
                );
            }

            return criteriaBuilder.and(
                    criteriaBuilder.greaterThan(
                            root.get("createdAt"),
                            createdFrom
                    ),
                    criteriaBuilder.lessThan(
                            root.get("createdAt"),
                            createdTo
                    )
            );
        });
    }
}
