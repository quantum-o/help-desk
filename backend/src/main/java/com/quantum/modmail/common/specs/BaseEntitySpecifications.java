package com.quantum.modmail.common.specs;

import com.quantum.modmail.common.entity.BaseEntity;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;

public class BaseEntitySpecifications<T> {
    public static <T extends BaseEntity> Specification<T> createdBefore(Instant createdTo) {
        return (root, query, criteriaBuilder) ->
                createdTo == null ? null
                        : criteriaBuilder.lessThan(
                        root.get("createdAt"),
                        createdTo
                );
    }

    public static <T extends BaseEntity> Specification<T> createdAfter(Instant createdFrom) {
        return (root, query, criteriaBuilder) ->
                createdFrom == null ? null
                        : criteriaBuilder.greaterThan(
                        root.get("createdAt"),
                        createdFrom
                );
    }

    public static <T extends BaseEntity> Specification<T> createdBetween(Instant createdFrom, Instant createdTo) {
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
