'use client';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useMe from '@/features/auth/hooks/use-me';
import { SidebarItem } from '@/types/sidebar';
import { IconDashboard, IconTicket } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
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
	const router = useRouter();
	const { data, isLoading, isError } = useMe();

	useEffect(() => {
		if (!isLoading && isError) {
			console.log('User is not authenticated, redirecting to login page');
			router.replace('/login');
		}
	}, [isLoading, isError, router]);

	if (isLoading) {
		return <div className="">Loading</div>;
	}

	return (
		<SidebarProvider>
			<AppSidebar items={navList} />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default AuthenticatedLayout;
