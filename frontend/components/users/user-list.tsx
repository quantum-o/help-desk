import { DataTable } from '../data-table';
import getColumns from './table/columns';
import { User } from '@/types/User';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';

type Props = {
	data: User[];
	totalCount: number;
	pagination: PaginationState;
	setPagination: OnChangeFn<PaginationState>;
};

const UserList = ({ data, pagination, setPagination, totalCount }: Props) => {
	return (
		<div className="h-180">
			<DataTable
				columns={getColumns()}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				totalCount={totalCount}
			/>
		</div>
	);
};

export default UserList;
