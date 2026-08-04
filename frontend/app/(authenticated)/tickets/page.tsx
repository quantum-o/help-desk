'use client';

import HeaderText from '@/components/header-text';
import TicketCard from '@/components/ticket-card';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import useMyTickets from '@/features/tickets/hooks/use-my-tickets';
import { IconSearch } from '@tabler/icons-react';

const page = () => {
	const myTickets = useMyTickets();

	if (
		myTickets.isLoading ||
		myTickets.isError ||
		myTickets.data?.data === undefined
	) {
		return <div>Loading...</div>;
	}

	return (
		<div className="px-4">
			<HeaderText title="Tickets" description="View all your support tickets" />

			<InputGroup className="max-w-xs mt-6">
				<InputGroupInput placeholder="Search..." />
				<InputGroupAddon>
					<IconSearch />
				</InputGroupAddon>
			</InputGroup>

			<div className="grid grid-cols-1 gap-4 mt-4">
				{myTickets.data?.data.length === 0 ? (
					<div className="text-muted-foreground">No tickets found.</div>
				) : (
					myTickets.data?.data.map((ticket) => (
						<TicketCard
							key={ticket.id}
							id={ticket.id}
							title={ticket.title}
							description={ticket.description}
							status={ticket.status}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default page;
