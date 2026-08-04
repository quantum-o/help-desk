import { IconChevronRight } from '@tabler/icons-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import Link from 'next/link';
import { TicketStatus } from '@/features/tickets/types/enums';

type Props = {
	id: string;
	title: string;
	description: string;
	status?: TicketStatus;
};

const TicketStatusCard = ({ status }: { status: TicketStatus | undefined }) => {
	let statusColor = '';
	let statusText = '';
	switch (status) {
		case TicketStatus.OPEN:
			statusColor = 'bg-green-500';
			statusText = 'Open';
			break;
		case TicketStatus.CLOSED:
			statusColor = 'bg-red-500';
			statusText = 'Closed';
			break;
		case TicketStatus.IN_PROGRESS:
			statusColor = 'bg-yellow-500';
			statusText = 'In Progress';
			break;
		default:
			statusColor = 'bg-gray-500';
			statusText = 'Unknown';
			break;
	}

	return (
		<div
			className={`${statusColor} text-white px-2 py-1 rounded-md text-xs font-bold uppercase`}
		>
			{statusText}
		</div>
	);
};

const TicketCard = ({ id, title, description, status }: Props) => {
	return (
		<Card className="relative">
			<Link href={`/tickets/${id}`} className="flex flex-col">
				<CardHeader>
					<div className="flex gap-4 items-center">
						<CardTitle>{title}</CardTitle>
						<TicketStatusCard status={status} />
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{description}</CardDescription>
				</CardContent>
				<IconChevronRight className="absolute top-1/2 -translate-y-1/2 right-4 ml-auto" />
			</Link>
		</Card>
	);
};

export default TicketCard;
