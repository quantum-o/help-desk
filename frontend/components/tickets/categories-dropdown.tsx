import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CategoryResponse } from '@/features/categories/types/CategoryResponse';

function CategoryMenuItem({
	category,
	onSelect,
}: {
	category: CategoryResponse;
	onSelect: (id: number) => void;
}) {
	const hasChildren = category.children.filter(c => !c.passive).length > 0;

	if (!hasChildren) {
		return (
			<DropdownMenuItem onClick={() => onSelect(category.id)}>
				{category.name}
			</DropdownMenuItem>
		);
	}

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>

			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel onClick={() => onSelect(category.id)}>
							{category.name}
						</DropdownMenuLabel>
						{category.children.filter(c => !c.passive).map((child) => (
							<CategoryMenuItem
								key={child.id}
								category={child}
								onSelect={onSelect}
							/>
						))}
					</DropdownMenuGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
}

export function CategoryDropdown({
	categories,
	value,
	onChange,
	loading,
}: {
	categories: CategoryResponse[];
	value: number | null;
	onChange: (value: number | null) => void;
	loading: boolean;
}) {
	const selectedCategory = categories
		.flatMap(function flatten(category): CategoryResponse[] {
			return [category, ...(category.children.filter(c => !c.passive)?.flatMap(flatten) ?? [])];
		})
		.find((category) => category.id === value);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				{selectedCategory?.name ?? 'Select category'}
			</DropdownMenuTrigger>

			{!loading ? (
				<DropdownMenuContent>
					{categories.map((category) => (
						<CategoryMenuItem
							key={category.id}
							category={category}
							onSelect={onChange}
						/>
					))}
				</DropdownMenuContent>
			) : (
				<DropdownMenuContent>
					<DropdownMenuItem disabled>Loading...</DropdownMenuItem>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
