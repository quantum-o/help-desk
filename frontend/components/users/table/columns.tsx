'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from '../../data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/types/User';
import useGetRoles from '@/features/authorization/hooks/use-get-roles';
import { PermissionCode } from '@/types/PermissionCode';
import useAuthStore from '@/features/authentication/auth-store';
import UserActions from '@/components/user-actions';

const columnHelper = createColumnHelper<DataTableFeatures, User>();

const columns = [
	{
		requiredPermission: PermissionCode.USER_READ,
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
		requiredPermission: PermissionCode.USER_READ,
		column: columnHelper.accessor('username', {
			header: 'Username',
		}),
	},
	{
		requiredPermission: PermissionCode.USER_READ,
		column: columnHelper.accessor('email', {
			header: 'Email',
		}),
	},
	{
		requiredPermission: PermissionCode.USER_UPDATE,
		column: columnHelper.accessor('roles', {
			header: 'Role',
			cell: ({ row }) => {
				const role = row.original.roles;
				const { data } = useGetRoles();
				const roleData = data?.data.filter((r) =>
					role.find((roleId) => roleId === r.id),
				);
				return roleData?.map((r) => r.name).join(', ') || 'No Role';
			},
		}),
	},
	{
		requiredPermission: PermissionCode.USER_READ,
		column: columnHelper.accessor('createdAt', {
			header: 'Created At',
			cell: (info) => new Date(info.getValue()).toLocaleString(),
		}),
	},
	{
		requiredPermission: PermissionCode.USER_READ,
		column: columnHelper.accessor('updatedAt', {
			header: 'Last Updated',
			cell: (info) => new Date(info.getValue()).toLocaleString(),
		}),
	},
	{
		requiredPermission: PermissionCode.USER_UPDATE,
		column: columnHelper.display({
			header: 'Actions',
			cell: (info) => <UserActions user={info.row.original} />,
		}),
	},
].filter((column) => column !== null);

export default function getColumns() {
	const { hasPermission } = useAuthStore();
	const cols = columns
		.filter(
			(column) =>
				column.requiredPermission === undefined ||
				hasPermission(column.requiredPermission),
		)
		.map((column) => column.column);
	return columnHelper.columns(cols);
}
