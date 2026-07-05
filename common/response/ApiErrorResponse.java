package com.quantum.modmail.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class ApiErrorResponse {
    private boolean success;

    private String message;

    private String errorCode;

    private Object details;

    private Instant timestamp;

    public static ApiErrorResponse of(String message, String errorCode, Object details) {
        return new ApiErrorResponse(false, message, errorCode, details, Instant.now());
    }
}
