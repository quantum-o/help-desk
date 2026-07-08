package com.quantum.modmail.common.response;

import lombok.Builder;

@Builder
public record PaginationObject (
    boolean hasMore,
    String nextCursor
){
}
