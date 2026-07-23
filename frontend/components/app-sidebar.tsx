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
import { SidebarItem } from '@/types/sidebar';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export interface AppSidebarProps {
	items: SidebarItem[];
}

export default function AppSidebar({ items }: AppSidebarProps) {
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
									{item.icon}
									<Link href={item.url}>{item.name}</Link>
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
							<SidebarMenuButton>
								<IconLogout />
								<a href="/logout">Logout</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarFooter>
		</Sidebar>
	);
}
