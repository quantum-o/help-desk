'use client';

import AllTickets from '@/components/tickets/AllTickets';
import MyTickets from '@/components/tickets/MyTickets';
import useAuthStore from '@/features/authentication/auth-store';
import useGetTickets from '@/features/tickets/hooks/use-get-tickets';
import { useState } from 'react';

const page = (): React.ReactNode => {
	const isAdmin = useAuthStore((state) => state.isAdmin());
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const { data, isLoading, isError, error } = useGetTickets(pagination);
	if (isLoading || isError || data?.data === undefined) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<div>
				Error: {error instanceof Error ? error.message : 'Unknown error'}
			</div>
		);
	}

	const pageResponse = data.data;

	if (!isAdmin)
		return (
			<MyTickets
				data={pageResponse.content}
				pagination={pagination}
				setPagination={setPagination}
				totalCount={pageResponse.totalElements || 0}
			/>
		);

	return (
		<AllTickets
			data={pageResponse.content}
			pagination={pagination}
			setPagination={setPagination}
			totalCount={pageResponse.totalElements || 0}
		/>
	);
};

export default page;
