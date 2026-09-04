import {
	IconArrowsSort,
	IconSortAscending2,
	IconSortDescending2,
} from '@tabler/icons-react';
import { Button } from '../ui/button';

type SortingButtonProps = {
	title: string;
	column: any;
};

function sortIcon(sorting: 'asc' | 'desc' | false) {
	if (sorting === 'asc') {
		return <IconSortAscending2 className="w-4 h-4" />;
	}
	if (sorting === 'desc') {
		return <IconSortDescending2 className="w-4 h-4" />;
	}
	return <IconArrowsSort className="w-4 h-4" />;
}

const SortingButton = ({ title, column }: SortingButtonProps) => {
	return (
		<Button
			variant="ghost"
			onClick={(e) => column.toggleSorting(undefined, e.shiftKey)}
		>
			{title}
			{sortIcon(column.getIsSorted())}
		</Button>
	);
};

export default SortingButton;
