'use client';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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

		if(!data?.success)
			redirect('/login');

		useAuthStore.getState().setUser(data?.data ?? null);
	}, [isLoading, isError]);

	if (isLoading) {
		return <div className="">Loading</div>;
	}

	return (
		<SidebarProvider>
			<AppSidebar items={navList} />
			<main className='w-full'>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default AuthenticatedLayout;
