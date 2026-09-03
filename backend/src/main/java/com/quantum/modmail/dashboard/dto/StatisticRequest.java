package com.quantum.modmail.dashboard.dto;

import java.time.Instant;

public record StatisticRequest(
        Instant from,
        Instant to
) {
}
