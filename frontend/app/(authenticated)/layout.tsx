'use client';
import AppSidebar from '@/components/app-sidebar';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import useAuthStore from '@/features/auth/auth-store';
import useMe from '@/features/auth/hooks/use-me';
import { SidebarItem } from '@/types/sidebar';
import { IconDashboard, IconTicket } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const navList: SidebarItem[] = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: <IconDashboard />,
	},
	{
		name: 'Tickets',
		url: '/tickets',
		icon: <IconTicket />,
	},
];

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	const { data, isLoading, isError } = useMe();

	useEffect(() => {
		if (!isLoading && isError) {
			redirect('/login');
		}

		useAuthStore.getState().setUser(data?.data ?? null);
	}, [isLoading, isError]);

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
