import HeaderText from '../header-text';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '../ui/input-group';
import { IconSearch } from '@tabler/icons-react';
import TicketCard from '../ticket-card';
import { ITicket } from '@/features/tickets/types/ITicket';

type Props = {
    ticketList: ITicket[];
};

const MyTickets = ({ ticketList }: Props) => {
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
				{ticketList.length === 0 ? (
					<div className="text-muted-foreground">No tickets found.</div>
				) : (
					ticketList.map((ticket) => (
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

export default MyTickets;
