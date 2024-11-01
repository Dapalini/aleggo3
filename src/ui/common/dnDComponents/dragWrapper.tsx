import { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ReactElement } from 'react';
import { MdDragIndicator } from "react-icons/md";

type DragWrapperProps = {
  index: any,
  isItemDragging: any,
  item: any,
  itemDragged: string,
  children: ReactElement | undefined
  title: string,
  color: string,
  otherActionItems: ReactElement | undefined,
  onDragStart: (itemDragged: string, index: any, isDragging: any) => void
  onDragEnd: () => void
}

const DragWrapper = (props: DragWrapperProps) => {
  const {
    index,
    item,
    itemDragged,
    isItemDragging,
    title,
    children,
    color,
    otherActionItems,
    onDragStart,
    onDragEnd
  } = props

  const dragIconRef = useRef<HTMLDivElement>(null);
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		type: item,
		item: () => {
			onDragStart(item, index, true);
			return { index: index };
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

   useEffect(() => {
    if (dragIconRef.current) {
      drag(dragIconRef)
    }
    if(dragPreviewRef.current){
      dragPreview(dragPreviewRef)
    }
  }, [drag, dragPreview]);

	return (
		<div
      id={`drag${Object.keys(index).map(( key: any ) => `-${index[key]}`)}`}
      onDragEnd={onDragEnd}
      ref={dragPreviewRef}
      style={{
        opacity: isDragging ? 0.6 : 1,
        overflow: isItemDragging ? 'hidden' : "visible",
      }}
      className={`container shadow rounded border border-${color} mt-2 p-3 ${
        isDragging || itemDragged === item ? 'DraggedItem-active' : 'DraggedItem-inactive'
      }`}
    >
    <div className='d-flex justify-content-between'>
      <h5 className={`text-${color}`}>{title}</h5>
      <div className='d-flex'>
        <div ref={dragIconRef} style={{ cursor: 'move'  }}>
          <MdDragIndicator style={{ fontSize: "26px"}}/>
        </div>
        {otherActionItems}
        </div>
      </div>
      {children}
    </div>
  );
}
 
export default DragWrapper;