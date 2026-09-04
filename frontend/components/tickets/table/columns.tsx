'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from '../../data-table';
import { ITicket } from '@/features/tickets/types/ITicket';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { TicketPriority, TicketStatus } from '@/features/tickets/types/enums';
import { cn } from '@/lib/utils';
import useAuthStore from '@/features/authentication/auth-store';
import { PermissionCode } from '@/types/PermissionCode';
import SortingButton from '../sorting-button';

const columnHelper = createColumnHelper<DataTableFeatures, ITicket>();

const columns = [
	{
		requiredPermission: PermissionCode.TICKET_READ,
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
		column: columnHelper.accessor('status', {
			header: ({ column }) => <SortingButton title="Status" column={column} />,
			cell: ({ row }) => {
				const status = row.original.status;
				return (
					<span
						className={cn('px-2 py-1 rounded-md text-white', {
							'bg-green-500': status === TicketStatus.OPEN,
							'bg-yellow-500': status === TicketStatus.IN_PROGRESS,
							'bg-red-500': status === TicketStatus.CLOSED,
							'bg-blue-700': status === TicketStatus.RESOLVED,
						})}
					>
						{status}
					</span>
				);
			},
		}),
	},
	{
		column: columnHelper.accessor('title', {
			header: ({ column }) => <SortingButton title="Title" column={column} />,
			cell: ({ row }) => (
				<Link href={`/tickets/${row.original.id}`}>{row.original.title}</Link>
			),
		}),
	},
	{
		column: columnHelper.accessor('priority', {
			header: 'Priority',
			cell: ({ row }) => {
				const priority = row.original.priority;
				return (
					<span
						className={cn('px-2 py-1 rounded-md text-white', {
							'bg-red-800': priority === TicketPriority.URGENT,
							'bg-red-500': priority === TicketPriority.HIGH,
							'bg-yellow-500': priority === TicketPriority.MEDIUM,
							'bg-green-500': priority === TicketPriority.LOW,
						})}
					>
						{priority}
					</span>
				);
			},
		}),
	},
	{
		column: columnHelper.accessor('category', {
			header: 'Category',
			cell: (info) => info.getValue(),
		}),
	},
	{
		column: columnHelper.accessor('createdAt', {
			header: ({ column }) => (
				<SortingButton title="Created At" column={column} />
			),
			cell: (info) => new Date(info.getValue()).toLocaleString(),
		}),
	},
	{
		requiredPermission: PermissionCode.TICKET_READ,
		column: columnHelper.accessor('updatedAt', {
			header: 'Last Updated',
			cell: (info) => new Date(info.getValue()).toLocaleString(),
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
