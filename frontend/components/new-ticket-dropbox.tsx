import { AttachmentResponse } from '@/features/attachments/types/AttachmentResponse';
import { useRef } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { IconFile, IconUpload, IconX } from '@tabler/icons-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type TargetBoxProps = {
	onDrop: (item: { files: any[] }) => void;
	onDelete?: (item: AttachmentResponse) => void;
	items?: AttachmentResponse[];
};

const NewTicketDropbox = ({ onDrop, onDelete, items }: TargetBoxProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: [NativeTypes.FILE],
			drop(item: { files: any[] }) {
				if (onDrop) {
					onDrop(item);
				}
			},
			canDrop(item: any) {
				// console.log('canDrop', item.files, item.items);
				return true;
			},
			hover(item: any) {
				// console.log('hover', item.files, item.items);
			},
			collect: (monitor: DropTargetMonitor) => {
				const item = monitor.getItem() as any;
				if (item) {
					// console.log('collect', item.files, item.items);
				}

				return {
					isOver: monitor.isOver(),
					canDrop: monitor.canDrop(),
				};
			},
		}),
		[onDrop, items],
	);

	const isActive = canDrop && isOver;
	drop(ref);
	return (
		<>
			<div
				ref={ref}
				className={cn(
					'group relative flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all',
					'border-muted-foreground/25 bg-muted/20 hover:border-primary/50 hover:bg-muted/40',
					{
						'border-primary bg-primary/5': isActive,
					},
				)}
			>
				<div className="flex flex-col items-center justify-center gap-2 text-center">
					<div
						className={cn(
							'flex size-12 items-center justify-center rounded-full bg-muted transition-colors',
							{
								'bg-primary/10 text-primary': isActive,
							},
						)}
					>
						<IconUpload className="size-6" />
					</div>

					<div className="space-y-1">
						<p className="text-sm font-medium">
							{isActive ? 'Release to upload' : 'Drop files here'}
						</p>

						<p className="text-xs text-muted-foreground">
							{isActive
								? 'Release your files to start uploading'
								: 'Drag and drop files here, or click to select'}
						</p>
					</div>

					<p className="text-xs text-muted-foreground">PNG, JPG, JPEG or PDF</p>
				</div>

				{items && items.length > 0 && (
					<div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((item) => (
							<div
								key={item.id}
								className="group/file relative flex items-center gap-3 rounded-lg border bg-background p-3 shadow-sm transition-shadow hover:shadow-md"
							>
								<div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
									{['image/png', 'image/jpeg', 'image/jpg'].includes(
										item.contentType,
									) ? (
										<img
											src={item.url}
											alt={item.originalName}
											className="size-full object-cover"
										/>
									) : (
										<IconFile className="size-6 text-muted-foreground" />
									)}
								</div>

								<div className="min-w-0 flex-1">
									<Link
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										className="block truncate text-sm font-medium hover:underline"
									>
										{item.originalName}
									</Link>

									<p className="text-xs text-muted-foreground">
										{(item.size / 1024).toFixed(2)} KB
									</p>
								</div>

								<Button
									variant="ghost"
									size="icon"
									className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
									onClick={() => onDelete?.(item)}
								>
									<IconX className="size-4" />
								</Button>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default NewTicketDropbox;
