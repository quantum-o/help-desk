'use client';

import SearchFilter from '@/components/data-table/filters/search-filter';
import UserActiveFilter from '@/components/data-table/filters/user-active-filter';
import HeaderText from '@/components/header-text';
import { Button } from '@/components/ui/button';
import UserList from '@/components/users/user-list';
import NewUserDialog from '@/components/users/user-new-dialog';
import useAuthStore from '@/features/authentication/auth-store';
import useGetUsers from '@/features/users/hooks/use-get-users';
import { buildQueryString, safeParseInt } from '@/lib/utils';
import { PermissionCode } from '@/types/PermissionCode';
import { UserTableFilter } from '@/types/UsersTableFilter';
import { IconPlus } from '@tabler/icons-react';
import { Updater } from '@tanstack/react-form';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import {
	notFound,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const page = (): React.ReactNode => {
	const { hasPermission } = useAuthStore();
	if (!hasPermission(PermissionCode.USER_READ)) return notFound();

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [newUserDialog, setNewUserDialog] = useState(false);
	const [pagination, setPagination] = useState({
		pageIndex: safeParseInt(searchParams.get('page'), 0),
		pageSize: safeParseInt(searchParams.get('size'), 20),
	});

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
		[
			{
				id: 'active',
				value: searchParams.get('active'),
			},
		].filter((filter) => filter.value != null),
	);

	const searchParamRecords = useMemo<UserTableFilter>(() => {
		const filters = Object.fromEntries(
			columnFilters.map((filter) => [filter.id, filter.value]),
		) as Partial<UserTableFilter>;

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

	const getUsers = useGetUsers(searchParamRecords);

	const pageResponse = getUsers.data?.data ?? {
		content: [],
		totalElements: 0,
	};

	if (getUsers.isLoading) {
		return <div className="">Loading</div>;
	}

	if (getUsers.isError) {
		return <div className="">Error</div>;
	}

	return (
		<div className="flex flex-col gap-4 py-2 px-4">
			<HeaderText
				title="Users"
				description="Manage users and their permissions"
			/>

			<div className="w-full flex items-center justify-between">
				<div className='flex gap-4'>
					<SearchFilter
						columnFilters={columnFilters}
						setColumnFilters={setColumnFilters}
					/>
					<UserActiveFilter
						columnFilters={columnFilters}
						setColumnFilters={setColumnFilters}
					/>
				</div>
				<Button onClick={() => setNewUserDialog(true)}>
					<IconPlus className="mr-2" />
					New User
				</Button>
			</div>

			<UserList
				data={pageResponse.content}
				totalCount={pageResponse.totalElements}
				pagination={pagination}
				setPagination={setPaginationWithSearchParams}
				columnFilters={columnFilters}
				setColumnFilters={setColumnFiltersWithSearchParams}
			/>

			<NewUserDialog open={newUserDialog} onOpenChange={setNewUserDialog} />
		</div>
	);
};

export default page;
