import React from 'react';
import { PermissionCode } from './PermissionCode';

export interface SidebarItem {
	name: string;
	url: string;
	icon: React.ReactNode;
	requiredPermission: PermissionCode;
}