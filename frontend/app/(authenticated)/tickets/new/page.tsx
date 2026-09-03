'use client';

import HeaderText from '@/components/header-text';
import NewTicketDropbox from '@/components/tickets/new-ticket-dropbox';
import { CategoryDropdown } from '@/components/tickets/categories-dropdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import useAddAttachment from '@/features/attachments/hooks/use-add-attachment';
import { AttachmentResponse } from '@/features/attachments/types/AttachmentResponse';
import useGetCategories from '@/features/categories/hooks/use-get-categories';
import useCreateTicket from '@/features/tickets/hooks/use-create-ticket';
import CreateNewTicket from '@/features/tickets/types/CreateNewTicket';
import { TicketPriority } from '@/features/tickets/types/enums';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewTicket = () => {
	const createTicket = useCreateTicket();
	const router = useRouter();
	const [attachmentList, setAttachmentList] = useState<AttachmentResponse[]>(
		[],
	);

	const form = useForm({
		defaultValues: {
			title: '',
			category: -1,
			priority: TicketPriority.MEDIUM,
			description: '',
		},
		validators: {
			onSubmit: CreateNewTicket,
		},
		onSubmit: async (values) => {
			createTicket.mutate({
				...values.value,
				attachments: attachmentList.map((attachment) => attachment.id),
			}, {
				onSuccess: (response) => {
					router.push(`/tickets/${response.data.id}`);
				},
				onError: (error) => {
					console.error('Error creating ticket:', error);
				},
			});
		},
	});

	const { data: categoryData, isLoading: categoriesLoading } =
		useGetCategories();

	const attachmentMutation = useAddAttachment();

	const handleAttachmentDrop = async (item: { files: File[] }) => {
		const files = item.files;
		if (!files?.length) return;

		const results = await Promise.allSettled(
			files.map((file) => attachmentMutation.mutateAsync({ file })),
		);

		const successfulAttachments = results
			.filter((result) => result.status === 'fulfilled')
			.flatMap((result) => result.value.data);

		setAttachmentList((prevList) => [...prevList, ...successfulAttachments]);

		results
			.filter((result) => result.status === 'rejected')
			.forEach((result) => {
				console.error('Error uploading attachment:', result.reason);
			});
	};

	const handleDeleteAttachment = (item: AttachmentResponse) => {
		setAttachmentList((prevList) =>
			prevList.filter((attachment) => attachment.id !== item.id),
		);
	};

	return (
		<div className="flex flex-col w-full px-12 py-6 gap-4">
			<HeaderText
				title="Create Ticket"
				description="Create a new support ticket"
			/>

			<div>
				<Card>
					<CardContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<FieldGroup>
								<form.Field
									name="title"
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Title</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="Briefly describe your issue"
													required
												/>
											</Field>
										);
									}}
								/>
								<FieldGroup className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4">
									<form.Field
										name="category"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Category</FieldLabel>
													<FieldError errors={field.state.meta.errors} />
													<CategoryDropdown
														categories={categoryData?.data ?? []}
														value={field.state.value as number | null}
														onChange={(value) =>
															field.handleChange(value as number)
														}
														loading={categoriesLoading}
													/>
												</Field>
											);
										}}
									/>
									<form.Field
										name="priority"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<div className="inline-flex items-center gap-2">
														<FieldLabel htmlFor={field.name}>
															Priority
														</FieldLabel>
														<FieldError errors={field.state.meta.errors} />
													</div>
													<RadioGroup
														defaultValue={TicketPriority.MEDIUM}
														className="flex flex-row gap-2 items-center"
														value={field.state.value.toString()}
														onValueChange={(value) =>
															field.handleChange(value as TicketPriority)
														}
													>
														<div>
															<RadioGroupItem
																value={TicketPriority.LOW.toString()}
																id="low"
																className="peer sr-only hidden"
															/>
															<Label
																htmlFor="low"
																className="
																	inline-flex items-center gap-2
																	rounded-full border px-3 py-2
																	cursor-pointer
																	peer-data-checked:bg-primary/40
																	peer-data-checked:text-primary-foreground
																	peer-data-checked:border-primary
																"
															>
																<div className="size-2 rounded-full bg-gray-500" />
																Low
															</Label>
														</div>

														<div>
															<RadioGroupItem
																value={TicketPriority.MEDIUM.toString()}
																id="medium"
																className="peer sr-only hidden"
															/>
															<Label
																htmlFor="medium"
																className="
																	inline-flex items-center gap-2
																	rounded-full border px-3 py-2
																	cursor-pointer
																	peer-data-checked:bg-primary/40
																	peer-data-checked:text-primary-foreground
																	peer-data-checked:border-primary
																"
															>
																<div className="size-2 rounded-full bg-blue-500" />
																Medium
															</Label>
														</div>

														<div>
															<RadioGroupItem
																value={TicketPriority.HIGH.toString()}
																id="high"
																className="peer sr-only hidden"
															/>
															<Label
																htmlFor="high"
																className="
																	inline-flex items-center gap-2
																	rounded-full border px-3 py-2
																	cursor-pointer
																	peer-data-checked:bg-primary/40
																	peer-data-checked:text-primary-foreground
																	peer-data-checked:border-primary
																"
															>
																<div className="size-2 rounded-full bg-orange-500" />
																High
															</Label>
														</div>

														<div>
															<RadioGroupItem
																value={TicketPriority.URGENT.toString()}
																id="urgent"
																className="peer sr-only hidden"
															/>
															<Label
																htmlFor="urgent"
																className="
																	inline-flex items-center gap-2
																	rounded-full border px-3 py-2
																	cursor-pointer
																	peer-data-checked:bg-primary/40
																	peer-data-checked:text-primary-foreground
																	peer-data-checked:border-primary
																"
															>
																<div className="size-2 rounded-full bg-red-700" />
																Urgent
															</Label>
														</div>
													</RadioGroup>
												</Field>
											);
										}}
									/>
								</FieldGroup>
								<form.Field
									name="description"
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>
													Description
												</FieldLabel>
												<FieldError errors={field.state.meta.errors} />
												<Textarea
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder="Briefly describe your issue"
													required
												/>
											</Field>
										);
									}}
								/>
								<Field>
									<NewTicketDropbox
										onDrop={handleAttachmentDrop}
										onDelete={handleDeleteAttachment}
										items={attachmentList}
									/>
								</Field>
								<Field>
									<Button type="submit">Create Ticket</Button>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default NewTicket;
