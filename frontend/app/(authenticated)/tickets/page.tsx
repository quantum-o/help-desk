'use client';

import MyTickets from '@/components/tickets/MyTickets';
import { columns } from '@/components/tickets/table/columns';
import { DataTable } from '@/components/tickets/table/data-table';
import useAuthStore from '@/features/auth/auth-store';
import useGetTickets from '@/features/tickets/hooks/use-get-tickets';
import { useState } from 'react';

const page = () => {
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

	if (pageResponse.totalElements === 0) {
		return <div>No tickets found.</div>;
	}

	if (!isAdmin) return <MyTickets ticketList={pageResponse.content} />;

	return (
		<DataTable
			columns={columns}
			data={pageResponse.content}
			pagination={pagination}
			setPagination={setPagination}
			totalCount={pageResponse.totalElements}
		/>
	);
};

export default page;
