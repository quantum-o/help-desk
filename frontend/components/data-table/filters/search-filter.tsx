import { TicketFiltersProps } from './ITicketFilterProps';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash-es';

const SearchFilter = (props: TicketFiltersProps) => {
	const { columnFilters, setColumnFilters } = props;
    const [searchPermission, setSearchPermission] = useState(
		(columnFilters.find((filter) => filter.id === 'q')?.value as string) ?? '',
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setSearchPermission(value);
			}, 300),
		[],
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	useEffect(() => {
		if (searchPermission) {
			setColumnFilters([
				...columnFilters.filter((filter) => filter.id !== 'q'),
				{
					id: 'q',
					value: searchPermission,
				},
			]);
		} else {
			setColumnFilters(columnFilters.filter((filter) => filter.id !== 'q'));
		}
	}, [searchPermission]);

	return (
		<Input
			placeholder="Search for a text"
			onChange={(e) => {
				debouncedSearch(e.target.value);
			}}
		/>
	);
};

export default SearchFilter;
