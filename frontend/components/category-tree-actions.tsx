import React from 'react';
import { Button } from './ui/button';
import useUpdateCategory from '@/features/categories/hooks/use-update-category';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import useDeleteCategory from '@/features/categories/hooks/use-delete-category';

type CategoryTreeActionsProps = {
	categoryId: number;
	categoryPassive: boolean;
	setAddCategoryDialog: (open: boolean) => void;
	setSelectedParentCategoryId: (id: number | null) => void;
	setDeleteDialogOpen: (open: boolean) => void;
};

const CategoryTreeActions = ({
	categoryId,
	categoryPassive,
	setAddCategoryDialog,
	setSelectedParentCategoryId,
	setDeleteDialogOpen,
}: CategoryTreeActionsProps) => {
	const useDeleteCategoryMutation = useDeleteCategory();
	const useUpdateCategoryMutation = useUpdateCategory();

	return (
		<div className="flex items-center gap-1">
			<div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 z-10">
				<Button
					variant="primary"
					size="icon"
					className="size-7"
					onClick={(e) => {
						e.stopPropagation();
						setSelectedParentCategoryId(categoryId);
						setAddCategoryDialog(true);
					}}
				>
					<IconPlus className="size-4" />
				</Button>
			</div>

			<div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100 z-10">
				{categoryPassive ? (
					<Button
						variant="success"
						size="icon"
						className="size-7"
						onClick={(e) => {
							e.stopPropagation();
							useUpdateCategoryMutation.mutate({
								categoryId: categoryId,
								passive: false,
							});
						}}
					>
						<IconCheck className="size-4" />
					</Button>
				) : (
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
				)}
			</div>
		</div>
	);
};

export default CategoryTreeActions;
