import HeaderText from '../header-text';
import { ITicket } from '@/features/tickets/types/ITicket';
import { DataTable } from '../data-table';
import getColumns from './table/columns';
import useAuthStore from '@/features/authentication/auth-store';

type Props = {
	data: ITicket[];
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
	totalCount: number;
};

const MyTickets = ({ data, pagination, setPagination, totalCount }: Props) => {
	const isAdmin = useAuthStore((state) => state.isAdmin());

	return (
		<div className="flex flex-col px-4 py-2 gap-4">
			<HeaderText
				title="My Tickets"
				description="View all your support tickets"
			/>

			<div className="h-180">
				<DataTable
					columns={getColumns(isAdmin)}
					data={data}
					pagination={pagination}
					setPagination={setPagination}
					totalCount={totalCount}
				/>
			</div>
		</div>
	);
};

export default MyTickets;
