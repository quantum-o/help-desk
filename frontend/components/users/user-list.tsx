import { DataTable } from '../data-table';
import getColumns from './table/columns';
import { User } from '@/types/User';
import {
	ColumnFiltersState,
	OnChangeFn,
	PaginationState,
} from '@tanstack/react-table';

type Props = {
	data: User[];
	totalCount: number;
	pagination: PaginationState;
	setPagination: OnChangeFn<PaginationState>;
	columnFilters?: ColumnFiltersState;
	setColumnFilters?: OnChangeFn<ColumnFiltersState>;
};

const UserList = ({
	data,
	totalCount,
	pagination,
	setPagination,
	columnFilters,
	setColumnFilters,
}: Props) => {
	return (
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
	);
};

export default UserList;
