'use client';

import HeaderText from '@/components/header-text';
import TicketMessage from '@/components/ticket-message';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { Skeleton } from '@/components/ui/skeleton';
import useGetTicketMessages from '@/features/tickets/hooks/use-get-messages';
import useGetTicket from '@/features/tickets/hooks/use-get-ticket';
import useSendMessage from '@/features/tickets/hooks/use-send-message';
import { IconSend } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { useParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import z from 'zod';

export default function Page() {
	const params = useParams<{ id: string }>();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useGetTicketMessages(params.id);
	const ticketData = useGetTicket(params.id);
	const isAdmin = false;

	const messagesRef = useRef<HTMLDivElement>(null);
	const messages = data?.pages.flatMap((page) => page.data).reverse() ?? [];
	const previousHeightRef = useRef(0);

	useEffect(() => {
		const el = messagesRef.current;
		if (!el) return;

		const handleScroll = () => {
			if (el.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
				const el = messagesRef.current;
				if (!el) return;

				previousHeightRef.current = el.scrollHeight;
				fetchNextPage();
			}
		};

		el.addEventListener('scroll', handleScroll);
		return () => el.removeEventListener('scroll', handleScroll);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	useLayoutEffect(() => {
		const el = messagesRef.current;
		if (!el || isFetchingNextPage) return;

		const diff = el.scrollHeight - previousHeightRef.current;

		if (diff > 0) {
			el.scrollTop += diff;
			previousHeightRef.current = 0;
		} else el.scrollTop = el.scrollHeight;
	}, [messages, isFetchingNextPage]);

	const sendMessageHook = useSendMessage();
	const messageForm = useForm({
		defaultValues: {
			message: '',
		},

		validators: {
			onSubmit: z.object({
				message: z
					.string()
					.min(2, 'Message must be at least 2 characters')
					.max(1000, 'Message must be at most 1000 characters'),
			}),
		},

		onSubmit: async ({ value, formApi }) => {
			sendMessageHook.mutate({
				ticketId: params.id,
				message: value.message,
			});
			formApi.reset();
		},
	});

	return (
		<>
			<div className="flex h-[calc(100vh-4rem)]">
				<div className="flex flex-1 flex-col">
					<div className="border-b px-6 py-5">
						<div className="mb-2 flex items-center gap-2">
							<div className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-600">
								{ticketData.isLoading ? (
									<Skeleton className="h-4 w-8 bg-green-600/20 rounded-full" />
								) : (
									(ticketData.data?.data.status.toString() ?? 'UNKNOWN')
								)}
							</div>

							<div className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-600">
								{ticketData.isLoading ? (
									<Skeleton className="h-4 w-8 bg-red-600/20 rounded-full" />
								) : (
									(ticketData.data?.data.priority.toString() ?? 'UNKNOWN')
								)}
							</div>

							<span className="ml-auto text-sm text-muted-foreground">
								#{params.id}
							</span>
						</div>

						<HeaderText
							title={`${ticketData.data?.data.title ?? 'Loading...'}`}
							description={`Created at: ${new Date(ticketData.data?.data.createdAt ?? '').toLocaleString() ?? 'Loading...'}`}
						/>
					</div>

					<div className="flex flex-1 flex-col overflow-hidden">
						<div
							ref={messagesRef}
							className="flex flex-1 flex-col overflow-y-auto bg-muted/20 p-6"
						>
							<div className="space-y-6">
								{messages.map((message) => (
									<TicketMessage
										key={message.id}
										id={message.id}
										senderId={message.senderId}
										senderEmail={message.senderEmail}
										message={message.message}
										createdAt={message.createdAt}
										ticketAuthor={ticketData.data?.data.createdBy ?? ''}
									/>
								))}
							</div>
						</div>

						<div className="border-t bg-background p-4">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									messageForm.handleSubmit(e);
								}}
							>
								<messageForm.Field
									name="message"
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Reply</FieldLabel>
												<FieldError errors={field.state.meta.errors} />
												<InputGroup className="h-14">
													<InputGroupInput
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Type your message..."
														required
													/>
													<InputGroupAddon align="inline-end">
														<Button type="submit" variant="ghost" size="sm">
															<IconSend className="size-4" />
														</Button>
													</InputGroupAddon>
												</InputGroup>
											</Field>
										);
									}}
								/>
							</form>
						</div>
					</div>
				</div>

				{isAdmin && (
					<aside className="w-80 border-l bg-muted/20 p-6">Admin Panel</aside>
				)}
			</div>
		</>
	);
}
