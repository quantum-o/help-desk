'use client';

import HeaderText from '@/components/header-text';
import UserList from '@/components/users/user-list';
import useAuthStore from '@/features/authentication/auth-store';
import useGetUsers from '@/features/users/hooks/use-get-users';
import { PermissionCode } from '@/types/PermissionCode';
import { notFound } from 'next/navigation';
import React, { useState } from 'react';

const page = (): React.ReactNode => {
	const { hasPermission } = useAuthStore();
	if (!hasPermission(PermissionCode.USER_READ)) return notFound();

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const getUsers = useGetUsers(pagination);

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

			<UserList
				data={pageResponse.content}
				pagination={pagination}
				setPagination={setPagination}
				totalCount={pageResponse.totalElements}
			/>
		</div>
	);
};

export default page;
