package com.quantum.modmail.user.dto;

import java.time.Instant;

public record UserFilter(
        String q,
        Boolean active,
        Instant createdFrom,
        Instant createdTo
) {
}
