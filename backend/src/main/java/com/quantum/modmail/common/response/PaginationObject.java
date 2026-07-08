package com.quantum.modmail.common.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaginationObject {
    private boolean hasMore;
    private String nextCursor;
}
