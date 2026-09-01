import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { TicketMessagesResponse } from '@/features/tickets/types/TicketMessagesResponse';
import useAuthStore from '@/features/authentication/auth-store';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from './ui/dialog';
import { IconDownload, IconFile } from '@tabler/icons-react';
import { Button } from './ui/button';

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
						'w-full overflow-hidden shadow-sm',
						isSentByUser
							? 'bg-primary text-primary-foreground'
							: 'bg-background',
					)}
				>
					<CardContent className="space-y-3 px-4">
						{props.message && (
							<p className="whitespace-pre-wrap text-left leading-relaxed">
								{props.message}
							</p>
						)}

						{props.attachments?.length > 0 && (
							<div className="flex flex-wrap gap-4">
								{props.attachments.map((attachment) => {
									const isImage = attachment.contentType.startsWith('image/');

									return (
										<div
											key={attachment.id}
											className={cn(
												'group relative overflow-hidden rounded-lg border',
												isSentByUser
													? 'border-primary-foreground/20'
													: 'border-border',
											)}
										>
											{isImage ? (
												<Dialog>
													<DialogTrigger className="cursor-pointer">
														<div className="min-h-52 min-w-52 max-h-52 max-w-52 flex items-center justify-center overflow-hidden rounded-lg bg-muted transition-transform group-hover:scale-[1.02]">
															<img
																src={attachment.url}
																alt={attachment.originalName}
																className="max-h-80 w-full object-contain transition-transform group-hover:scale-[1.02]"
															/>
														</div>
													</DialogTrigger>

													<DialogContent className="sm:max-w-5xl!">
														<DialogDescription>
															<img
																src={attachment.url}
																alt={attachment.originalName}
																className="max-h-[85vh] w-full object-contain"
															/>
														</DialogDescription>
														<DialogFooter>
															<div className="w-full text-popover-foreground">
																{attachment.originalName}
															</div>
															<Button>
																<IconDownload className="size-4" />
																<a
																	href={attachment.url}
																	download={attachment.originalName}
																	aria-label={`${attachment.originalName} download`}
																>
																	Download
																</a>
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
											) : (
												<div className="flex items-center gap-3 p-3">
													<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
														<IconFile className="size-5 text-muted-foreground" />
													</div>

													<div className="min-w-0 flex-1">
														<p className="truncate text-sm font-medium">
															{attachment.originalName}
														</p>
													</div>

													<Button
														variant="ghost"
														size="icon"
														className="shrink-0"
													>
														<a
															href={attachment.url}
															download={attachment.originalName}
															aria-label={`${attachment.originalName} indir`}
														>
															<IconDownload className="size-4" />
														</a>
													</Button>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TicketMessage;
