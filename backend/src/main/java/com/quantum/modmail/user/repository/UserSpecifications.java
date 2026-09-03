package com.quantum.modmail.user.repository;

import com.quantum.modmail.user.entity.User;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserSpecifications {
    public static Specification<User> query(String filter) {
        return (root, query, cb) -> {
            if (filter == null || filter.isBlank()) {
                return null;
            }

            String normalizedFilter = filter.trim().toLowerCase();

            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.like(
                    cb.lower(root.get("username")),
                    "%" + normalizedFilter + "%"
            ));

            predicates.add(cb.like(
                    cb.lower(root.get("email")),
                    "%" + normalizedFilter + "%"
            ));

            predicates.add(cb.like(
                    cb.lower(root.get("id").cast(String.class)),
                    "%" + normalizedFilter + "%"
            ));

            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<User> hasActive(Boolean active) {
        return (root, query, criteriaBuilder) ->
                active == null
                        ? null
                        : criteriaBuilder.equal(root.get("active"), active);
    }

    public static <T> Specification<T> isNotDeleted() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isFalse(root.get("deleted"));
    }
}
