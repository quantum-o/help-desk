'use client';
import AppSidebar from '@/components/app-sidebar';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import useAuthStore from '@/features/authentication/auth-store';
import useMe from '@/features/authentication/hooks/use-me';
import { PermissionCode } from '@/types/PermissionCode';
import { SidebarItem } from '@/types/sidebar';
import { IconCategory, IconDashboard, IconTicket, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const navList: SidebarItem[] = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: <IconDashboard />,
		requiredPermission: PermissionCode.TICKET_READ,
	},
	{
		name: 'Tickets',
		url: '/tickets',
		icon: <IconTicket />,
		requiredPermission: PermissionCode.TICKET_READ,
	},
	{
		name: 'Categories',
		url: '/categories',
		icon: <IconCategory />,
		requiredPermission: PermissionCode.CATEGORY_READ,
	},
	{
		name: 'Roles',
		url: '/roles',
		icon: <IconUsersGroup />,
		requiredPermission: PermissionCode.ROLE_READ,
	},
	{
		name: 'Users',
		url: '/users',
		icon: <IconUsers />,
		requiredPermission: PermissionCode.USER_READ,
	},
];

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
	const { data, isLoading, isError } = useMe();

	useEffect(() => {
		if (!isLoading && isError) {
			redirect('/login');
		}

		useAuthStore.getState().setUser(data?.data ?? null);
	}, [isLoading, isError, data?.data]);

	if (isLoading) {
		return <div className="">Loading</div>;
	}

	return (
		<SidebarProvider>
			<div className="h-screen w-full flex flex-col">
				<div className="relative top-0 z-50 flex h-16 items-center justify-between gap-0 bg-sidebar border-b">
					<div className="flex items-center gap-2 px-4">
						<div className="">Help Desk</div>
						<div className="">
							<SidebarTrigger />
						</div>
					</div>
				</div>

				<div className="flex flex-1 min-h-0">
					<AppSidebar items={navList} className="pt-16" />

					<SidebarInset className="min-h-0 min-w-0">
						<main className="h-full overflow-y-auto">{children}</main>
					</SidebarInset>
				</div>
			</div>
		</SidebarProvider>
	);
};

export default AuthenticatedLayout;
