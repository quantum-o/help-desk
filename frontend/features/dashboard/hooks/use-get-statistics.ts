import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDashboardStatistics } from "../api/get-statistics";
import { DashboardRequest } from "../types/DashboardRequest";

export default function useGetDashboardStatistics(data: DashboardRequest) {
    return useQuery({
        queryKey: ["statistics", data],
        queryFn: () => getDashboardStatistics(data),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData
    });
}