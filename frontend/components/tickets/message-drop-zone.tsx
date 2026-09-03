import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

export default function MessageDropZone({
	children,
	onFiles,
}: {
	children: React.ReactNode;
	onFiles: (files: File[]) => void;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: [NativeTypes.FILE],

			canDrop: () => true,

			hover: () => {
				setIsDragging(true);
			},

			drop: (item: { files: File[] }) => {
				setIsDragging(false);
				onFiles(item.files);
			},

			collect: (monitor) => ({
				isOver: monitor.isOver({ shallow: true }),
				canDrop: monitor.canDrop(),
			}),
		}),
		[onFiles],
	);

	useEffect(() => {
		if (!isOver) {
			setIsDragging(false);
		}
	}, [isOver]);

	drop(ref);
	return (
		<div ref={ref} className="relative flex flex-1 flex-col overflow-hidden">
			{children}

			{isDragging && canDrop && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
					<div className="pointer-events-none rounded-xl border-2 border-dashed border-primary bg-primary/10 px-12 py-10 text-center">
						<p className="text-lg font-semibold">Drop files here</p>

						<p className="mt-1 text-sm text-muted-foreground">
							Release to attach your files
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
