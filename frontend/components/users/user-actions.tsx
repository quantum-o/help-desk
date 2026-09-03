import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IconDots } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { ConfirmationDialog } from '../confirmation-dialog';
import { User } from '@/types/User';
import UserEditDialog from './user-edit-dialog';
import useDeleteUser from '@/features/users/hooks/use-delete-user';

type UserActionsProps = {
	user: User;
};

const UserActions = ({ user }: UserActionsProps) => {
	const [editDialog, setEditDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);

	const deleteUserQuery = useDeleteUser();
	const handleConfirmUserDelete = useCallback(async () => {
		await deleteUserQuery.mutateAsync(user.id);
		setDeleteDialog(false);
	}, [user.id]);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<IconDots />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setEditDialog(true)}>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						variant="destructive"
						onClick={() => setDeleteDialog(true)}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<UserEditDialog
				key={`user-edit-dialog-${user.id}`}
				open={editDialog}
				onOpenChange={setEditDialog}
				user={user}
			/>

			<ConfirmationDialog
				key={`user-delete-confirmation-${user.id}`}
				confirmText="Delete user"
				cancelText="cancel"
				open={deleteDialog}
				onOpenChange={setDeleteDialog}
				title="Are you sure you want to delete this user?"
				description="This action cannot be undone."
				onConfirm={handleConfirmUserDelete}
				performAction={deleteUserQuery.isPending}
			/>
		</>
	);
};

export default UserActions;
