export type CursorResponse<T> = {
    data: T;
    pagination: {
        nextCursor: string | null;
        hasMore: boolean;
    }
};