'use client';

import { CategoryTree } from '@/components/category-tree';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useAddCategory from '@/features/categories/hooks/use-add-category';
import useGetCategories from '@/features/categories/hooks/use-get-categories';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod';

const page = (): React.ReactNode => {
	const { data, isLoading, isError } = useGetCategories();
    const addCategoryMutation = useAddCategory();
	const [addCategoryDialog, setAddCategoryDialog] = useState(false);
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState<number | null>(null);
	const form = useForm({
		defaultValues: {
			name: '',
		},
		validators: {
			onSubmit: z.object({
                name: z.string().min(1, 'Name is required'),
            }),
		},
		onSubmit: async (values) => {
			setAddCategoryDialog(false);
			values.formApi.reset();
			setSelectedParentCategoryId(null);
			addCategoryMutation.mutate({
                name: values.value.name,
                parent: selectedParentCategoryId,
            });
		},
	});

	if (isLoading) {
		return <div className="">Loading</div>;
	}

	if (isError) {
		return <div className="">Error</div>;
	}

	return (
		<div className="px-4 py-4">
			<CategoryTree
				categories={data?.data ?? []}
				setAddCategoryDialog={setAddCategoryDialog}
				selectedParentCategoryId={selectedParentCategoryId}
				setSelectedParentCategoryId={setSelectedParentCategoryId}
			/>

			<Dialog open={addCategoryDialog} onOpenChange={setAddCategoryDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                            {selectedParentCategoryId
                                ? `Creating a subcategory under category ID: ${selectedParentCategoryId}`
                                : 'Creating a top-level category'}
                        </DialogDescription>
					</DialogHeader>
					<form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit(e);
                        }}
                    >
						<FieldGroup>
							<form.Field
								name="name"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter category name"
												required
											/>
										</Field>
									);
								}}
							/>

                            <Button
                                type="submit"
                                disabled={addCategoryMutation.isPending}
                            >
                                {addCategoryMutation.isPending ? 'Creating...' : 'Create Category'}
                            </Button>
						</FieldGroup>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default page;
