'use client';

import AllTickets from '@/components/tickets/AllTickets';
import MyTickets from '@/components/tickets/MyTickets';
import useAuthStore from '@/features/authentication/auth-store';
import useGetTickets from '@/features/tickets/hooks/use-get-tickets';
import useMyTickets from '@/features/tickets/hooks/use-my-tickets';
import { buildQueryString, safeParseInt } from '@/lib/utils';
import { PermissionCode } from '@/types/PermissionCode';
import { TicketTableFilter } from '@/types/TicketTableFilter';
import {
	ColumnFiltersState,
	PaginationState,
	Updater,
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const page = (): React.ReactNode => {
	const { hasPermission } = useAuthStore();
	const isAdmin = hasPermission(PermissionCode.TICKET_READ);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [pagination, setPagination] = useState({
		pageIndex: safeParseInt(searchParams.get('page'), 0),
		pageSize: safeParseInt(searchParams.get('size'), 20),
	});

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
		[
			{
				id: 'status',
				value: searchParams.get('status'),
			},
			{
				id: 'priority',
				value: searchParams.get('priority'),
			},
			{
				id: 'categoryId',
				value: searchParams.get('categoryId'),
			},
			{
				id: 'assigneeId',
				value: searchParams.get('assigneeId'),
			},
		].filter((filter) => filter.value != null),
	);

	const searchParamRecords = useMemo<TicketTableFilter>(() => {
		const filters = Object.fromEntries(
			columnFilters.map((filter) => [filter.id, filter.value]),
		) as Partial<TicketTableFilter>;

		return {
			page: pagination.pageIndex,
			size: pagination.pageSize,
			...filters,
		};
	}, [pagination, columnFilters]);

	const setPaginationWithSearchParams = (updater: Updater<PaginationState>) => {
		const nextPagination =
			typeof updater === 'function' ? updater(pagination) : updater;

		setPagination(nextPagination);
	};

	const setColumnFiltersWithSearchParams = (
		updater: Updater<ColumnFiltersState>,
	) => {
		const nextColumnFilters =
			typeof updater === 'function' ? updater(columnFilters) : updater;

		setColumnFilters(nextColumnFilters);
	};

	useEffect(() => {
		const query = buildQueryString(searchParamRecords);

		const nextUrl = `${pathname}${query}`;

		if (nextUrl !== window.location.pathname + window.location.search) {
			router.replace(nextUrl);
		}
	}, [searchParamRecords, pathname, router]);

	const { data, isLoading, isError, error } = isAdmin
		? useGetTickets(searchParamRecords)
		: useMyTickets(searchParamRecords);

	if (isLoading || data?.data === undefined) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message || 'Unknown error'}</div>;
	}

	const pageResponse = data.data;

	if (!isAdmin)
		return (
			<MyTickets
				data={pageResponse.content}
				totalCount={pageResponse.totalElements || 0}
				pagination={pagination}
				setPagination={setPaginationWithSearchParams}
				columnFilters={columnFilters}
				setColumnFilters={setColumnFiltersWithSearchParams}
			/>
		);

	return (
		<AllTickets
			data={pageResponse.content}
			totalCount={pageResponse.totalElements || 0}
			pagination={pagination}
			setPagination={setPaginationWithSearchParams}
			columnFilters={columnFilters}
			setColumnFilters={setColumnFiltersWithSearchParams}
		/>
	);
};

export default page;
