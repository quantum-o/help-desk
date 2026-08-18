import HeaderText from '@/components/header-text';
import React from 'react';

const page = (): React.ReactNode => {
	return (
		<HeaderText
			title="Users"
			description="Manage users and their permissions"
		/>
	);
};

export default page;
