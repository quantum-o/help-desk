import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { TicketMessagesResponse } from '@/features/tickets/types/TicketMessagesResponse';
import useAuthStore from '@/features/authentication/auth-store';

type Props = TicketMessagesResponse;

const TicketMessage = (props: Props) => {
	const { user } = useAuthStore();

	const isSentByUser = user?.id === props.senderId;
	return (
		<div className={cn('flex', isSentByUser ? 'justify-end' : 'justify-start')}>
			<div className="max-w-[70%]">
				<div
					className={cn(
						'mb-2 flex items-center gap-2 text-sm',
						isSentByUser && 'justify-end',
					)}
				>
					{!isSentByUser && (
						<Avatar size="sm">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
					)}

					{!isSentByUser && (
						<span className="font-medium">{props.senderId}</span>
					)}

					<span className="text-xs text-muted-foreground">
						{new Date(props.createdAt).toLocaleString()}
					</span>
				</div>

				<Card
					size="sm"
					className={cn(
						'shadow-sm',
						isSentByUser
							? 'bg-primary text-primary-foreground'
							: 'bg-background',
					)}
				>
					<CardContent className="px-4">
						<p className="whitespace-pre-wrap leading-3 text-left">
							{props.message}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TicketMessage;
