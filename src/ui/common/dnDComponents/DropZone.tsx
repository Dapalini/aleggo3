import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ 
	isDragging,
	index,
	item: acceptItem,
	onDrop,
}: any) => {

  const ref = useRef<HTMLDivElement>(null);

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: acceptItem,
			drop: (item: any) => {
				onDrop(acceptItem, item.index, index);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop()
			})
		}),
		[]
	);

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
      }
  }, [drop]);
	
  return (
		<div>
			<div
				ref={ref}
				className={`Drop-zone ${isDragging ? 'Drop-zone-active' : null} ${
					isOver && canDrop ? 'Drop-zone-expanded' : null
				} container mt-2`}
			/>
		</div>
	);
};

export default DropZone;