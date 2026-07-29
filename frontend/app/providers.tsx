'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default Provider;
