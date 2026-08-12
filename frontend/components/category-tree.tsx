import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { CategoryResponse } from '@/features/categories/types/CategoryResponse';
import {
	IconCheck,
	IconChevronRight,
	IconFolder,
	IconFolderOpen,
	IconPlus,
	IconX,
} from '@tabler/icons-react';
import useDeleteCategory from '@/features/categories/hooks/use-delete-category';
import { ConfirmationDialog } from './confirmation-dialog';
import { cn } from '@/lib/utils';
import useUpdateCategory from '@/features/categories/hooks/use-update-category';

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
	const hasChildren = category.children && category.children.filter(c => !c.passive).length > 0;
	const useDeleteCategoryMutation = useDeleteCategory();
	const useUpdateCategoryMutation = useUpdateCategory();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
						className={`mr-1 size-4 transition-transform ${open ? 'rotate-90' : ''}`}
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
					{`${category.passive ? '(Passive) ' : ''}${category.name}`}
				</span>

				<div className="flex items-center gap-1">
					<div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 z-10">
						<Button
							variant="primary"
							size="icon"
							className="size-7"
							onClick={(e) => {
								e.stopPropagation();
								setSelectedParentCategoryId(category.id);
								setAddCategoryDialog(true);
							}}
						>
							<IconPlus className="size-4" />
						</Button>
					</div>
					{category.passive ? (
						<div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 z-10">
							<Button
								variant="success"
								size="icon"
								className="size-7"
								onClick={(e) => {
									e.stopPropagation();
									useUpdateCategoryMutation.mutate({
										categoryId: category.id,
										passive: false,
									});
								}}
							>
								<IconCheck className="size-4" />
							</Button>
						</div>
					) : (
						<div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 z-10">
							<Button
								variant="destructive"
								size="icon"
								className="size-7"
								onClick={(e) => {
									e.stopPropagation();
									setDeleteDialogOpen(true);
								}}
								disabled={useDeleteCategoryMutation.isPending}
							>
								<IconX className="size-4" />
							</Button>
						</div>
					)}
				</div>
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
	return (
		<div className="rounded-lg border bg-card p-2">
			<div className="mb-2 flex items-center justify-between border-b px-3 py-2">
				<div>
					<h3 className="text-sm font-semibold">Categories</h3>
					<p className="text-xs text-muted-foreground">
						Manage your category hierarchy
					</p>
				</div>

				<Button size="sm" onClick={() => setAddCategoryDialog(true)}>
					<IconPlus className="mr-2 size-4" />
					Add category
				</Button>
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
