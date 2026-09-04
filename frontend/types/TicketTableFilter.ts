export type TicketTableFilter = {
    q?: string;
    page?: number;
    size?: number;
    status?: string;
    priority?: string;
    categoryId?: string;
    assigneeId?: string;
    createdFrom?: string;
    createdTo?: string;
    sort?: string[];
};