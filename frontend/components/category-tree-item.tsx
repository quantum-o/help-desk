import useAuthStore from '@/features/authentication/auth-store';
import useDeleteCategory from '@/features/categories/hooks/use-delete-category';
import { CategoryResponse } from '@/features/categories/types/CategoryResponse';
import { useState } from 'react';
import { Collapsible, CollapsibleContent } from './ui/collapsible';
import {
	IconChevronRight,
	IconFolder,
	IconFolderOpen,
} from '@tabler/icons-react';
import { PermissionCode } from '@/types/PermissionCode';
import CategoryTreeActions from './category-tree-actions';
import { ConfirmationDialog } from './confirmation-dialog';
import { cn } from '@/lib/utils';

function CategoryTreeItem({
	category,
	depth = 0,
	setAddCategoryDialog,
	selectedParentCategoryId,
	setSelectedParentCategoryId,
}: {
	category: CategoryResponse;
	depth?: number;
	setAddCategoryDialog: (open: boolean) => void;
	selectedParentCategoryId: number | null;
	setSelectedParentCategoryId: (id: number | null) => void;
}) {
	const [open, setOpen] = useState(false);
	const hasChildren = category.children && category.children.length > 0;
	const useDeleteCategoryMutation = useDeleteCategory();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { hasPermission } = useAuthStore();

	return (
		<Collapsible open={open} onOpenChange={setOpen} key={category.id}>
			<div
				className="group flex items-center rounded-md border border-transparent px-2 py-1.5 transition-colors hover:border-border hover:bg-muted/50"
				style={{
					marginLeft: depth * 24,
				}}
				onClick={() => hasChildren && setOpen(!open)}
			>
				{hasChildren ? (
					<IconChevronRight
						className={cn(
							'mr-1 size-4 transition-transform',
							open && 'rotate-90',
						)}
					/>
				) : (
					<div className="size-4 mr-1" />
				)}

				<div className="mr-2 text-muted-foreground">
					{open ? (
						<IconFolderOpen className="size-4" />
					) : (
						<IconFolder className="size-4" />
					)}
				</div>

				<span
					className={cn(
						'flex-1 truncate text-sm font-medium',
						category.passive && 'text-muted-foreground',
					)}
				>
					{category.passive && '(Passive) '}
					{category.name}
				</span>

				{hasPermission(PermissionCode.CATEGORY_UPDATE) && (
					<CategoryTreeActions
						categoryId={category.id}
						categoryPassive={category.passive}
						setAddCategoryDialog={setAddCategoryDialog}
						setSelectedParentCategoryId={setSelectedParentCategoryId}
						setDeleteDialogOpen={setDeleteDialogOpen}
					/>
				)}
			</div>

			{hasChildren && (
				<CollapsibleContent>
					<div className="relative">
						{category.children.map((child) => (
							<CategoryTreeItem
								key={child.id}
								category={child}
								depth={depth + 1}
								selectedParentCategoryId={selectedParentCategoryId}
								setSelectedParentCategoryId={setSelectedParentCategoryId}
								setAddCategoryDialog={setAddCategoryDialog}
							/>
						))}
					</div>
				</CollapsibleContent>
			)}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				title={`Delete "${category.name}"?`}
				description={
					hasChildren
						? `This category has some items inside it will be marked as passive instead of deleted.`
						: 'This category will be deleted. This action cannot be undone.'
				}
				confirmText={hasChildren ? 'Mark as Passive' : 'Delete'}
				onConfirm={async () => {
					await useDeleteCategoryMutation.mutateAsync({
						categoryId: category.id,
					});
				}}
			/>
		</Collapsible>
	);
}

export default CategoryTreeItem;
