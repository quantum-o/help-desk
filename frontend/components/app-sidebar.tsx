import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { logout } from '@/features/auth/api/logout';
import useAuthStore from '@/features/auth/auth-store';
import { SidebarItem } from '@/types/sidebar';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export interface AppSidebarProps {
	items: SidebarItem[];
}

export default function AppSidebar({ items }: AppSidebarProps) {
	const handleLogout = async () => {
		try {
			await logout();
			useAuthStore().logout();
		} catch (error) {
			console.log('Error during logout:', error);
		}
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="">
					<h4>Support Desk</h4>
					<p>Enterprise Support</p>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								variant="outline"
								className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200 justify-center"
							>
								<IconPlus />
								Create Ticket
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton>
									<Link href={item.url} className="flex w-full items-center gap-2">
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
