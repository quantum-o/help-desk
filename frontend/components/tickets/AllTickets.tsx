import HeaderText from '../header-text';
import { ITicket } from '@/features/tickets/types/ITicket';
import { DataTable } from '../data-table';
import getColumns from './table/columns';
import StatusFilter from '../data-table/filters/status-filter';
import {
	ColumnFiltersState,
	OnChangeFn,
	PaginationState,
	SortingState,
} from '@tanstack/react-table';
import PriorityFilter from '../data-table/filters/priority-filter';
import SearchFilter from '../data-table/filters/search-filter';

type Props = {
	data: ITicket[];
	pagination: PaginationState;
	setPagination: OnChangeFn<PaginationState>;
	columnFilters: ColumnFiltersState;
	setColumnFilters: OnChangeFn<ColumnFiltersState>;
	totalCount: number;
	sorting: SortingState;
	setSorting: OnChangeFn<SortingState>;
};

const AllTickets = ({
	data,
	pagination,
	setPagination,
	columnFilters,
	setColumnFilters,
	sorting,
	setSorting,
	totalCount,
}: Props) => {
	return (
		<div className="flex flex-col px-4 py-2 gap-4">
			<HeaderText
				title="Admin Tickets"
				description="View all your support tickets"
			/>
			<div className="flex gap-4 w-full items-center justify-start">
				<SearchFilter
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				/>

				<StatusFilter
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				/>
				<PriorityFilter
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				/>
			</div>

			<div className="h-180">
				<DataTable
					columns={getColumns()}
					data={data}
					totalCount={totalCount}
					pagination={pagination}
					setPagination={setPagination}
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
					sorting={sorting}
					setSorting={setSorting}
				/>
			</div>
		</div>
	);
};

export default AllTickets;
