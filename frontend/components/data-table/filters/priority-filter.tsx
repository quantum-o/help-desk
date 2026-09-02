import { TicketPriority } from '@/features/tickets/types/enums';
import { TicketFiltersProps } from './ITicketFilterProps';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const PriorityFilter = (props: TicketFiltersProps) => {
	const { columnFilters, setColumnFilters } = props;
	return (
		<Select
			defaultValue="all"
			value={
				(columnFilters.find((filter) => filter.id === 'priority')
					?.value as string) ?? ''
			}
			onValueChange={(value) => {
				setColumnFilters([
					...columnFilters.filter((filter) => filter.id !== 'priority'),
					value === 'all'
						? { id: 'priority', value: undefined }
						: {
								id: 'priority',
								value,
							},
				]);
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="Priority" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="all">All</SelectItem>
				<SelectItem value={TicketPriority.LOW}>Low</SelectItem>
				<SelectItem value={TicketPriority.MEDIUM}>Medium</SelectItem>
				<SelectItem value={TicketPriority.HIGH}>High</SelectItem>
				<SelectItem value={TicketPriority.URGENT}>Urgent</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default PriorityFilter;
