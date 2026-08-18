'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from '../../data-table';
import { ITicket } from '@/features/tickets/types/ITicket';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const columnHelper = createColumnHelper<DataTableFeatures, ITicket>();

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
		canAccess: (isAdmin: boolean) => isAdmin,
		column: columnHelper.accessor('status', {
			header: 'Status',
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('title', {
			header: 'Title',
			cell: ({ row }) => (
				<Link href={`/tickets/${row.original.id}`}>{row.original.title}</Link>
			),
		}),
	},
	{
		canAccess: (isAdmin: boolean) => true,
		column: columnHelper.accessor('priority', {
			header: 'Priority',
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
