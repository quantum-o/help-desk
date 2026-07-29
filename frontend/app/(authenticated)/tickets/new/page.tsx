'use client';

import HeaderText from '@/components/header-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CreateNewTicket from '@/features/tickets/types/CreateNewTicket';
import { useForm } from '@tanstack/react-form';

const Categories = ['Technical', 'Billing', 'General'];

const NewTicket = () => {
	const form = useForm({
		defaultValues: {
			title: '',
			category: '',
			priority: 'medium',
			description: '',
		},
		validators: {
			onSubmit: CreateNewTicket,
		},
		onSubmit: async (values) => {
			console.log('Form submitted with values:', values);
		},
	});
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
													<Select
														value={field.state.value}
														onValueChange={(value) =>
															field.handleChange(value || '')
														}
													>
														<SelectTrigger
															id={field.name}
															name={field.name}
															value={field.state.value}
															onChange={() =>
																field.handleChange(field.state.value)
															}
														>
															{field.state.value || 'Select a category'}
														</SelectTrigger>
														<SelectContent alignItemWithTrigger={false}>
															<SelectGroup>
																{Categories.map((category) => (
																	<SelectItem key={category} value={category}>
																		{category}
																	</SelectItem>
																))}
															</SelectGroup>
														</SelectContent>
													</Select>
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
													<FieldLabel htmlFor={field.name}>Priority</FieldLabel>
													<RadioGroup
														defaultValue="medium"
														className="flex flex-row gap-2 items-center"
													>
														<div>
															<RadioGroupItem
																value="low"
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
																value="medium"
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
																value="high"
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
																value="urgent"
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
