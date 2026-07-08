package com.quantum.modmail.common;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

public class CursorUtil {
    private static final String SEPARATOR = "\\|";

    public static String encodeCursor(Instant createdAt, UUID id) {
        String rawCursor = createdAt.toString() + "|" + id.toString();
        return Base64.getEncoder().encodeToString(rawCursor.getBytes(StandardCharsets.UTF_8));
    }

    public static DecodedCursor decodeCursor(String base64Cursor) {
        if (base64Cursor == null || base64Cursor.isEmpty()) return null;

        String rawCursor = new String(Base64.getDecoder().decode(base64Cursor), StandardCharsets.UTF_8);
        String[] parts = rawCursor.split(SEPARATOR);

        return new DecodedCursor(Instant.parse(parts[0]), UUID.fromString(parts[1]));
    }

    public record DecodedCursor(Instant createdAt, UUID id) {}
}
