'use client';

import { useTable, type ColumnDef, type RowData } from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { features, type DataTableFeatures } from './data-table-features';
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<DataTableFeatures, TData>[];
	data: TData[];
	totalCount?: number;
	pagination?: {
		pageIndex: number;
		pageSize: number;
	};
	setPagination?: any;
}

export function DataTable<TData extends RowData>({
	columns,
	data,
	totalCount,
	pagination,
	setPagination,
}: DataTableProps<TData>) {
	const table = useTable({
		features,
		data,
		columns,
		manualPagination: true,
		rowCount: totalCount ?? data.length,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
	});

	return (
		<div className="h-full flex flex-col overflow-hidden rounded-md border">
			<div className="min-h-0 flex-1 overflow-auto">
				<Table>
					<TableHeader className="bg-muted sticky top-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<table.FlexRender header={header} />
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="shrink-0">
				<Table>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={columns.length}>
								<DataTablePagination table={table} />
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
