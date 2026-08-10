export interface PageSort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface PageResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: PageSort;
        unpaged: boolean;
    };
    size: number;
    sort: PageSort;
    totalElements: number;
    totalPages: number;
}