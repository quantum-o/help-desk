import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { logout } from '@/features/authentication/api/logout';
import useAuthStore from '@/features/authentication/auth-store';
import { SidebarItem } from '@/types/sidebar';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export interface AppSidebarProps {
	items: SidebarItem[];
	className?: string;
}

export default function AppSidebar({ items, className }: AppSidebarProps): React.ReactNode {
	const { hasPermission } = useAuthStore();
	const handleLogout = async () => {
		try {
			await logout();
			useAuthStore().logout();
		} catch (error) {
			console.log('Error during logout:', error);
		}
	};

	return (
		<Sidebar className={className}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								variant="outline"
								className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200 justify-center"
							>
								<Link
									href="/tickets/new"
									className="flex w-full items-center justify-center gap-2"
								>
									<IconPlus />
									Create Ticket
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarMenu>
						{items.filter((item) => hasPermission(item.requiredPermission)).map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton>
									<Link
										href={item.url}
										className="flex w-full items-center gap-2"
									>
										{item.icon}
										{item.name}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton onClick={() => handleLogout()}>
								<IconLogout />
								Logout
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarFooter>
		</Sidebar>
	);
}
