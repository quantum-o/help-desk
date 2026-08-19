import { Button } from '@/components/ui/button';
import { CategoryResponse } from '@/features/categories/types/CategoryResponse';
import { IconPlus } from '@tabler/icons-react';
import { PermissionCode } from '@/types/PermissionCode';
import useAuthStore from '@/features/authentication/auth-store';
import CategoryTreeItem from './category-tree-item';

export function CategoryTree({
	categories,
	setAddCategoryDialog,
	selectedParentCategoryId,
	setSelectedParentCategoryId,
}: {
	categories: CategoryResponse[];
	setAddCategoryDialog: (open: boolean) => void;
	selectedParentCategoryId: number | null;
	setSelectedParentCategoryId: (id: number | null) => void;
}) {
	const { hasPermission } = useAuthStore();

	return (
		<div className="rounded-lg border bg-card p-2">
			<div className="mb-2 flex items-center justify-between border-b px-3 py-2">
				<div>
					<h3 className="text-sm font-semibold">Categories</h3>
					<p className="text-xs text-muted-foreground">
						Manage your category hierarchy
					</p>
				</div>

				{hasPermission(PermissionCode.CATEGORY_CREATE) && (
					<Button size="sm" onClick={() => setAddCategoryDialog(true)}>
						<IconPlus className="mr-2 size-4" />
						Add category
					</Button>
				)}
			</div>

			<div className="space-y-0.5">
				{categories
					.filter((cat) => cat !== null)
					.map((category) => (
						<CategoryTreeItem
							key={category.id}
							category={category}
							depth={0}
							selectedParentCategoryId={selectedParentCategoryId}
							setSelectedParentCategoryId={setSelectedParentCategoryId}
							setAddCategoryDialog={setAddCategoryDialog}
						/>
					))}
			</div>
		</div>
	);
}
