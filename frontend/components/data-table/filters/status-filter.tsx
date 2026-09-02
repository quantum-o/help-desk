import { TicketStatus } from '@/features/tickets/types/enums';
import { TicketFiltersProps } from './ITicketFilterProps';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const StatusFilter = (props: TicketFiltersProps) => {
	const { columnFilters, setColumnFilters } = props;
	return (
		<Select
			defaultValue="all"
			value={
				(columnFilters.find((filter) => filter.id === 'status')
					?.value as string) ?? ''
			}
			onValueChange={(value) => {
				setColumnFilters([
					...columnFilters.filter((filter) => filter.id !== 'status'),
					value === 'all'
						? { id: 'status', value: undefined }
						: {
								id: 'status',
								value,
							},
				]);
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="Status" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="all">All</SelectItem>
				<SelectItem value={TicketStatus.OPEN}>Open</SelectItem>
				<SelectItem value={TicketStatus.CLOSED}>Closed</SelectItem>
				<SelectItem value={TicketStatus.IN_PROGRESS}>In Progress</SelectItem>
				<SelectItem value={TicketStatus.RESOLVED}>Resolved</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default StatusFilter;
