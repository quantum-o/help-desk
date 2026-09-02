import { ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";

export interface TicketFiltersProps {
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}