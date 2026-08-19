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
			header: 'Status',
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
			header: 'Title',
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
						// className={`px-2 py-1 rounded-md text-white ${
						// 	priority === TicketPriority.HIGH
						// 		? 'bg-red-500'
						// 		: priority === TicketPriority.MEDIUM
						// 			? 'bg-yellow-500'
						// 			: 'bg-green-500'
						// }`}
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
		column: columnHelper.accessor('createdAt', {
			header: 'Created At',
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
