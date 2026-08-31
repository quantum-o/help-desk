import { useRef } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

type TargetBoxProps = {
	onDrop: (item: { files: any[] }) => void;
};

const NewTicketDropbox = (props: TargetBoxProps) => {
	const { onDrop } = props;
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
		[props],
	);

	const isActive = canDrop && isOver;
	drop(ref);
	return (
		<>
			<div
				ref={ref}
				className="w-full h-20 border-4 border-dashed border-primary rounded-lg flex items-center justify-center"
			>
				{isActive
					? 'Release to drop'
					: 'Drag file here or click to select a file'}
			</div>
		</>
	);
};

export default NewTicketDropbox;
