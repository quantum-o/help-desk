'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from '../../data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/types/User';
import useGetRoles from '@/features/authorization/hooks/use-get-roles';

const columnHelper = createColumnHelper<DataTableFeatures, User>();

const columns = [
	{
		canAccess: (isAdmin: boolean) => isAdmin,
		column: columnHelper.display({
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					indeterminate={
						table.getIsSomePageRowsSelected() &&
						!table.getIsAllPageRowsSelected()
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('username', {
			header: 'Username',
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('email', {
			header: 'Email',
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('role', {
			header: 'Role',
			cell: ({ row }) => {
				const role = row.original.role;
				const { data } = useGetRoles();
				const roleData = data?.data.filter((r) => role.find((roleId) => roleId === r.id));
				return roleData?.map((r) => r.name).join(', ') || 'No Role';
			},
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('createdAt', {
			header: 'Created At',
			cell: (info) => new Date(info.getValue()).toLocaleString(),
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('updatedAt', {
			header: 'Last Updated',
			cell: (info) => new Date(info.getValue()).toLocaleString(),
		}),
	},
].filter((column) => column !== null);

export default function getColumns(isAdmin: boolean) {
	const cols = columns
		.filter((column) => column.canAccess(isAdmin))
		.map((column) => column.column);
	return columnHelper.columns(cols);
}
