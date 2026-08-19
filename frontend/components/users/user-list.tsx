import HeaderText from '../header-text';
import { DataTable } from '../data-table';
import getColumns from './table/columns';
import useAuthStore from '@/features/authentication/auth-store';
import { User } from '@/types/User';

type Props = {
	data: User[];
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
	totalCount: number;
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
