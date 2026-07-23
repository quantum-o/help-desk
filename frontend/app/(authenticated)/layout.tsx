'use client';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useMe from '@/features/auth/hooks/use-me';
import { SidebarItem } from '@/types/sidebar';
import { IconDashboard, IconTicket } from '@tabler/icons-react';
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
	const me = useMe();
	useEffect(() => {
		async function fetchMe() {
			try {
				me.refetch();
				if (me.data?.success) {
					console.log('User data fetched successfully:', me.data);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		}
		fetchMe();
	}, []);

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
