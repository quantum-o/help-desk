package com.quantum.modmail.common.exception;

import com.quantum.modmail.common.response.ApiErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiErrorResponse> handleBusinessException(BusinessException ex) {
        ApiErrorResponse response = ApiErrorResponse.of(ex.getMessage(), ex.getErrorCode(), null);
        return ResponseEntity.status(ex.getStatus()).body(response);
    }
}
