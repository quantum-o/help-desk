import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

const AdminAside = () => {
	return (
		<aside className="w-80 border-l bg-muted/20 p-6">
			<div className="">Admin Panel</div>
			<div className="flex flex-col">
				<Card>
                    <CardHeader>
                        <p>Admin Actions</p>
                    </CardHeader>
					<CardContent className='flex flex-col'>
						<Button className="mb-2">Resolve Ticket</Button>
						<Button variant="destructive" className="mb-2">
							Close Ticket
						</Button>
					</CardContent>
				</Card>
				<Button variant="secondary">Change Priority</Button>
			</div>
		</aside>
	);
};

export default AdminAside;
