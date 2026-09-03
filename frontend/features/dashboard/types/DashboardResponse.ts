import { TicketTrend } from "./TicketTrend";

export type DashboardResponse = {
    openTickets: number;
    inProgressTickets: number;
    resolvedTickets: number;
    trend: TicketTrend[];
}