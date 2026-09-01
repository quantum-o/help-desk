import { IconX } from '@tabler/icons-react';
import { Button } from './ui/button';
import { AttachmentResponse } from '@/features/attachments/types/AttachmentResponse';

export default function AttachmentList({
	files,
	onRemove,
}: {
	files: AttachmentResponse[];
	onRemove: (file: AttachmentResponse) => void;
}) {
	return (
		<div className="mt-3 flex gap-3 overflow-x-auto pb-2">
			{files.map((file, index) => (
				<div
					key={file.id}
					className="relative h-50 w-50 shrink-0 overflow-hidden rounded-lg border bg-background"
				>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="absolute right-1 top-1 z-10 size-7 rounded-full bg-background/80 hover:bg-background"
						onClick={() => onRemove(file)}
					>
						<IconX className="size-4" />
					</Button>

					<div className="flex h-[155px] items-center justify-center bg-muted">
						{file.contentType.startsWith('image/') ? (
							<img
								src={file.url}
								alt={file.originalName}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="text-sm text-muted-foreground">FILE</div>
						)}
					</div>

					<div className="truncate px-3 py-2 text-sm font-medium">
						{file.originalName}
					</div>
				</div>
			))}
		</div>
	);
}
