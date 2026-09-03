import { TicketStatus } from '@/features/tickets/types/enums';
import { TicketFiltersProps } from './ITicketFilterProps';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const UserActiveFilter = (props: TicketFiltersProps) => {
	const { columnFilters, setColumnFilters } = props;
	return (
		<Select
			defaultValue="All"
			onValueChange={(value) => {
				setColumnFilters([
					...columnFilters.filter((filter) => filter.id !== 'active'),
					value === 'All'
						? { id: 'active', value: undefined }
						: {
								id: 'active',
								value: value === 'Active',
							},
				]);
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="Active" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="All">All</SelectItem>
				<SelectItem value="Active">Active</SelectItem>
				<SelectItem value="Passive">Passive</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default UserActiveFilter;
