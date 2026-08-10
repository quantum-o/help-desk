'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from './data-table-features';
import { ITicket } from '@/features/tickets/types/ITicket';
import { Checkbox } from '@/components/ui/checkbox';

const columnHelper = createColumnHelper<DataTableFeatures, ITicket>();

export const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
	columnHelper.accessor('status', {
		header: 'Status',
	}),
	columnHelper.accessor('title', {
		header: 'Title',
	}),
	columnHelper.accessor('createdAt', {
		header: 'Created At',
		cell: (info) => new Date(info.getValue()).toLocaleString(),
	}),
	columnHelper.accessor('updatedAt', {
		header: 'Last Updated',
		cell: (info) => new Date(info.getValue()).toLocaleString(),
	}),
]);
