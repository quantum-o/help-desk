package com.quantum.modmail.common.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CursorResponse<T> {
    private List<T> data;
    private PaginationObject pagination;

    public static <T> CursorResponse<T> of(List<T> data, boolean hasMore, String nextCursor) {
        return CursorResponse.<T>builder()
                .data(data)
                .pagination(PaginationObject.builder()
                        .hasMore(hasMore)
                        .nextCursor(nextCursor)
                        .build())
                .build();
    }
}
