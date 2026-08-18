import useGetPermissions from '@/features/authorization/hooks/use-get-permissions';
import { Button } from './ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible';
import { IconChevronsDown, IconSearch } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { RoleResponse } from '@/features/authorization/types/RoleResponse';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { useForm } from '@tanstack/react-form';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash-es';
import useUpdateRole from '@/features/authorization/hooks/use-update-role';
import { notFound } from 'next/navigation';

const PermissionCategory = ({
	category,
	permissions,
	form,
}: {
	category: string;
	permissions: any[];
	form: ReturnType<typeof useForm>;
}) => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<Collapsible
			className="flex flex-col gap-2 w-full"
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<CollapsibleTrigger>
				<div className="w-full h-12 border-b border-accent p-4 rounded-md flex items-center justify-between">
					<div className="w-full flex items-center justify-between text-xl font-semibold">
						<span>{category}</span>
						<IconChevronsDown />
					</div>
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className="flex flex-col gap-2">
				{permissions.map((permission) => (
					<form.Field key={permission.code} name="permissions">
						{(field: {
							state: { value: string[] };
							handleChange: (value: string[]) => void;
						}) => {
							const checked = field.state.value.includes(permission.code);

							return (
								<div
									key={permission.id}
									className="rounded-md border-b px-4 py-2 flex items-center justify-between"
								>
									<div className="text-sm flex flex-col gap-1">
										<p className="font-medium">{permission.code}</p>
										<p className="text-muted-foreground">
											{permission.description}
										</p>
									</div>
									<Switch
										id={`switch-${permission.id}`}
										checked={checked}
										onCheckedChange={(value) => {
											if (value) {
												field.handleChange([
													...field.state.value,
													permission.code,
												]);
											} else {
												field.handleChange(
													field.state.value.filter(
														(p) => p !== permission.code,
													),
												);
											}
										}}
									/>
								</div>
							);
						}}
					</form.Field>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

const PermissionList = ({
	activeRole,
}: {
	activeRole: RoleResponse | null;
}) => {
	const permissionsQuery = useGetPermissions();

	const permissionsByCategory = permissionsQuery.data?.data.reduce(
		(acc: Record<string, any[]>, permission) => {
			if (!acc[permission.category]) {
				acc[permission.category] = [];
			}
			acc[permission.category].push(permission);
			return acc;
		},
		{},
	);

	const [isDirty, setIsDirty] = useState(false);

	const form = useForm({
		defaultValues: {
			permissions: activeRole?.permissionList ?? [],
		},
		onSubmit: async ({ value }) => {
			handleUpdateRolePermissions(value.permissions);
		},
		listeners: {
			onChange: (form) => {
				debounce(() => {
					setIsDirty(!form.formApi.state.isDefaultValue);
				}, 300)();
			},
		},
	});

	const updateRole = useUpdateRole();
	const handleUpdateRolePermissions = useCallback(
		async (permissions: string[]) => {
			if (!activeRole?.id) {
				return;
			}

			updateRole.mutate(
				{
					id: activeRole.id ?? '',
					permissions,
				},
				{
					onSuccess: () => {
						form.reset({
							permissions,
						}, { keepDefaultValues: false });
						setIsDirty(false);
					},
				},
			);
		},
		[activeRole?.id],
	);

	return (
		<div className="flex flex-col gap-4 overflow-auto relative">
			<div className="w-full border-b border-accent p-4 rounded-md">
				Manage Role - {activeRole ? `${activeRole.name}` : 'No Role Selected'}
			</div>
			<InputGroup>
				<InputGroupAddon>
					<IconSearch />
				</InputGroupAddon>
				<InputGroupInput placeholder="Search Permissions" />
			</InputGroup>
			<div className="flex flex-col gap-4 overflow-y-auto">
				<form onSubmit={form.handleSubmit}>
					{permissionsByCategory &&
						Object.entries(permissionsByCategory).map(
							([category, permissions]) => (
								<PermissionCategory
									key={category}
									category={category}
									permissions={permissions}
									form={form}
								/>
							),
						)}
				</form>
			</div>
			<div
				className={cn(
					'w-full absolute bottom-6 left-1/2 z-50 -translate-x-1/2',
					'transition-all duration-200',
					isDirty
						? 'translate-y-0 opacity-100'
						: 'pointer-events-none translate-y-4 opacity-0',
				)}
			>
				<Card className="shadow-lg w-full">
					<CardContent className="flex items-center justify-between gap-4">
						<p className="text-muted-foreground text-sm">
							Save or discard your changes.
						</p>

						<div className="flex items-center gap-2">
							<Button variant="outline">Discard</Button>

							<Button
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								Save changes
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default PermissionList;
