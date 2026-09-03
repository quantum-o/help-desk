'use client';

import HeaderText from '@/components/header-text';
import { ChartAreaInteractive } from '@/components/tickets-chart';
import { Card, CardContent } from '@/components/ui/card';
import useGetDashboardStatistics from '@/features/dashboard/hooks/use-get-statistics';
import {
	IconCircleCheckFilled,
	IconHourglass,
	IconSettings,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';

const page = () => {
	const [timeRange, setTimeRange] = useState('90d');

	const referenceDate = new Date();
	let daysToSubtract = 90;
	if (timeRange === '30d') {
		daysToSubtract = 30;
	} else if (timeRange === '7d') {
		daysToSubtract = 7;
	}
	const startDate = new Date(referenceDate);
	startDate.setDate(startDate.getDate() - daysToSubtract);

	const { from, to } = useMemo(() => {
		const referenceDate = new Date();

		let daysToSubtract = 90;

		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}

		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);

		return {
			from: startDate.toISOString(),
			to: referenceDate.toISOString(),
		};
	}, [timeRange]);

	const useStatistics = useGetDashboardStatistics({
		from: from,
		to: to,
	});

	const statisticsData = useStatistics.data?.data || {
		openTickets: 0,
		inProgressTickets: 0,
		resolvedTickets: 0,
		trend: [],
	};

	return (
		<div className="flex flex-col px-4 py-2 gap-4">
			<HeaderText title="Dashboard" />

			<div className="w-full items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Card>
					<CardContent>
						<div className="flex items-center gap-2">
							<IconHourglass className="w-6 h-6 text-orange-500 animate-bounce-spin" />
							<div className="flex items-center justify-between w-full">
								<h2 className="text-lg font-semibold">Waiting Tickets</h2>
								<p className="text-2xl font-bold">
									{statisticsData.openTickets || 0}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-2">
							<IconSettings className="w-6 h-6 text-blue-500 motion-safe:animate-[spin_5s_linear_infinite]" />
							<div className="flex items-center justify-between w-full">
								<h2 className="text-lg font-semibold">In Progress Tickets</h2>
								<p className="text-2xl font-bold">
									{statisticsData.inProgressTickets || 0}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-2">
							<IconCircleCheckFilled className="w-6 h-6 text-green-600" />
							<div className="flex items-center justify-between w-full">
								<h2 className="text-lg font-semibold">Resolved Tickets</h2>
								<p className="text-2xl font-bold">
									{statisticsData.resolvedTickets || 0}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<ChartAreaInteractive
				timeRange={timeRange}
				setTimeRange={setTimeRange}
				chartData={useStatistics.data?.data.trend || []}
			/>
		</div>
	);
};

export default page;
