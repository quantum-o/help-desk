'use client';

import PermissionList from '@/components/permission-list';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/features/authentication/auth-store';
import useGetRoles from '@/features/authorization/hooks/use-get-roles';
import { Role } from '@/features/authorization/types/Role';
import { PermissionCode } from '@/types/PermissionCode';
import { IconPlus } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const Roles = () => {
	const { hasPermission } = useAuthStore();
	if (!hasPermission(PermissionCode.ROLE_READ)) return notFound();

	const rolesQuery = useGetRoles();

	const [selectedRole, setSelectedRole] = useState<Role | null>(null);

	useEffect(() => {
		if (selectedRole) return;

		setSelectedRole(rolesQuery.data?.data[0] ?? null);
	}, [rolesQuery.data?.data]);

	if (rolesQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (rolesQuery.isError) return <div>Error: {rolesQuery.error.message}</div>;

	return (
		<div className="w-full h-full flex">
			<div className="w-1/4 h-full flex flex-col gap-4 overflow-hidden border-r border-border px-4 py-2">
				<div className="flex items-center justify-between">
					<div className="font-semibold">Role List</div>
					{hasPermission(PermissionCode.ROLE_CREATE) && (
						<Button variant="default" size="sm" key="create-role">
							<IconPlus className="w-4 h-4" />
							New Role
						</Button>
					)}
				</div>
				<div className="flex gap-4 flex-col overflow-y-auto">
					{rolesQuery.data?.data.map((role) => (
						<Button
							variant="secondary"
							size="lg"
							className="w-full"
							key={role.id}
							onClick={() => setSelectedRole(role)}
						>
							{role.name}
						</Button>
					))}
				</div>
			</div>
			<div className="w-3/4 h-full flex flex-col px-4 py-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
				{selectedRole && (
					<PermissionList activeRole={selectedRole} key={selectedRole?.id} />
				)}
			</div>
		</div>
	);
};

export default Roles;
