'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import useGetDashboardStatistics from '@/features/dashboard/hooks/use-get-statistics';

export const description = 'An interactive area chart';

const chartConfig = {
	open: {
		label: 'Open Tickets',
		color: 'var(--chart-1)',
	},
	inProgress: {
		label: 'In Progress Tickets',
		color: 'var(--chart-2)',
	},
	resolved: {
		label: 'Resolved Tickets',
		color: 'var(--chart-3)',
	},
} satisfies ChartConfig;

export function ChartAreaInteractive({
	timeRange = '90d',
	setTimeRange,
	chartData,
}: {
	timeRange: string;
	setTimeRange: (value: string) => void;
	chartData: any[];
}) {
	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Tickets</CardTitle>
				</div>
				<Select
					value={timeRange}
					onValueChange={(e) => {
						setTimeRange(e ?? '90d');
					}}
				>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillOpen" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-open)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-open)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-inProgress)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-inProgress)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-resolved)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-resolved)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="open"
							type="natural"
							fill="url(#fillOpen)"
							stroke="var(--color-open)"
							stackId="a"
						/>
						<Area
							dataKey="inProgress"
							type="natural"
							fill="url(#fillInProgress)"
							stroke="var(--color-inProgress)"
							stackId="a"
						/>
						<Area
							dataKey="resolved"
							type="natural"
							fill="url(#fillResolved)"
							stroke="var(--color-resolved)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
