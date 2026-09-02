package com.quantum.modmail.ticket.repositories;

import com.quantum.modmail.category.CategoryService;
import com.quantum.modmail.category.entity.Category;
import com.quantum.modmail.ticket.entity.Ticket;
import com.quantum.modmail.ticket.entity.TicketPriority;
import com.quantum.modmail.ticket.entity.TicketStatus;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TicketSpecifications {
    public static Specification<Ticket> query(String filter) {
        return (root, query, cb) -> {
            if (filter == null || filter.isBlank()) {
                return null;
            }

            String normalizedFilter = filter.trim().toLowerCase();

            Predicate titlePredicate = cb.like(
                    cb.lower(root.get("title")),
                    "%" + normalizedFilter + "%"
            );

            String[] parts = normalizedFilter.split("\\.");

            Join<Ticket, Category> category =
                    root.join("category", JoinType.LEFT);

            Predicate categoryPredicate = cb.like(
                    cb.lower(category.get("name")),
                    parts[parts.length - 1] + "%"
            );

            if (parts.length > 1) {
                Join<Category, Category> parent =
                        category.join("parent", JoinType.LEFT);

                for (int i = parts.length - 2; i >= 0; i--) {
                    categoryPredicate = cb.and(
                            categoryPredicate,
                            cb.like(
                                    cb.lower(parent.get("name")),
                                    parts[i] + "%"
                            )
                    );

                    if (i > 0) {
                        parent = parent.join("parent", JoinType.LEFT);
                    }
                }
            }

            return cb.or(titlePredicate, categoryPredicate);
        };
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
