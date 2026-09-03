import { Dialog, DialogContent } from '../ui/dialog';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from '../ui/combobox';
import { Role } from '@/features/authorization/types/Role';
import { User } from '@/types/User';
import UpdateUserRequest from '@/features/users/types/UpdateUserRequest';
import { useForm } from '@tanstack/react-form';
import useUpdateUser from '@/features/users/hooks/use-update-user';
import useGetRoles from '@/features/authorization/hooks/use-get-roles';

type UserEditDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	user: User;
};

const UserEditDialog = ({ open, onOpenChange, user }: UserEditDialogProps) => {
	const rolesQuery = useGetRoles();
	const roleList = rolesQuery.data?.data ?? [];

	const anchor = useComboboxAnchor();

	const updateUserQuery = useUpdateUser();
	const form = useForm({
		defaultValues: {
			username: user.username,
			roles: user.roles as string[],
			active: user.active,
		},
		onSubmit: async ({ value }) => {
			onOpenChange(false);
			const response = await updateUserQuery.mutateAsync({
				userId: user.id,
				data: {
					username: value.username,
					roles: value.roles,
					active: value.active,
				},
			});

			if (response.success) {
				form.reset({
					username: value.username,
					roles: value.roles,
					active: value.active,
				});
			}
		},
		validators: {
			onSubmit: UpdateUserRequest,
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit(e);
					}}
				>
					<FieldSet>
						<FieldLegend>Editing User</FieldLegend>
						<FieldDescription>
							Currently editing user: {user.username}
						</FieldDescription>
						<FieldGroup>
							<form.Field
								name="username"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Username</FieldLabel>
											<FieldError errors={field.state.meta.errors} />
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Enter username"
												required
											/>
										</Field>
									);
								}}
							/>

							<form.Field
								name="roles"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;

									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Roles</FieldLabel>
											<FieldError errors={field.state.meta.errors} />
											<Combobox
												multiple
												autoHighlight
												items={roleList}
												value={field.state.value}
												onValueChange={(value) => {
													field.handleChange(value);
												}}
											>
												<ComboboxChips ref={anchor} className="w-full max-w-xs">
													<ComboboxValue>
														{field.state.value.map((roleId) => {
															const role = roleList.find(
																(r) => r.id === roleId,
															);

															return (
																<ComboboxChip key={roleId}>
																	{role?.name ?? roleId}
																</ComboboxChip>
															);
														})}
														<ComboboxChipsInput />
													</ComboboxValue>
												</ComboboxChips>

												<ComboboxContent anchor={anchor}>
													<ComboboxEmpty>No items found.</ComboboxEmpty>

													<ComboboxList>
														{(item: Role) => (
															<ComboboxItem key={item.id} value={item.id}>
																{item.name}
															</ComboboxItem>
														)}
													</ComboboxList>
												</ComboboxContent>
											</Combobox>
										</Field>
									);
								}}
							/>

							<form.Field
								name="active"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field
											data-invalid={isInvalid}
											orientation="horizontal"
											className="justify-normal"
										>
											<Checkbox
												id={field.name}
												name={field.name}
												checked={field.state.value}
												onBlur={field.handleBlur}
												onCheckedChange={(value) => field.handleChange(value)}
												aria-invalid={isInvalid}
											/>
											<FieldLabel htmlFor={field.name}>Active</FieldLabel>
										</Field>
									);
								}}
							/>
						</FieldGroup>
					</FieldSet>
					<Field orientation="horizontal" className="mt-4">
						<Button type="submit">Submit</Button>
						<Button variant="outline" type="button">
							Cancel
						</Button>
					</Field>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UserEditDialog;
