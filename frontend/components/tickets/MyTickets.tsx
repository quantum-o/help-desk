import HeaderText from '../header-text';
import { ITicket } from '@/features/tickets/types/ITicket';
import { DataTable } from '../data-table';
import getColumns from './table/columns';
import {
	ColumnFiltersState,
	OnChangeFn,
	PaginationState,
	SortingState,
} from '@tanstack/react-table';

type Props = {
	data: ITicket[];
	totalCount: number;
	pagination: PaginationState;
	setPagination: OnChangeFn<PaginationState>;
	columnFilters: ColumnFiltersState;
	setColumnFilters: OnChangeFn<ColumnFiltersState>;
	sorting: SortingState;
	setSorting: OnChangeFn<SortingState>;
};

const MyTickets = ({
	data,
	totalCount,
	pagination,
	setPagination,
	columnFilters,
	setColumnFilters,
}: Props) => {
	return (
		<div className="flex flex-col px-4 py-2 gap-4">
			<HeaderText
				title="My Tickets"
				description="View all your support tickets"
			/>

			<div className="h-180">
				<DataTable
					columns={getColumns()}
					data={data}
					totalCount={totalCount}
					pagination={pagination}
					setPagination={setPagination}
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				/>
			</div>
		</div>
	);
};

export default MyTickets;
