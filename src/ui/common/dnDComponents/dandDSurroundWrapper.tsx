import { ReactElement } from 'react';
import SurroundDropWrapper from './surroundDropWrapper';
import DragWrapper from './dragWrapper';


  type DragWrapperProps = {
  array: any,
  index: any,
  dragIndex: any,
  item: string,
  itemDragged: string,
  isDragging: any,
  children: ReactElement | undefined
  title: string,
  color: string,
  otherActionItems: ReactElement | undefined,
  onDragStart: (itemDragged: string, dragIndex: any, isDragging: any) => void,
  onDragEnd: () => void,
  onDrop: (item: string, oldIndex: any, newIndex: any ) => void
}

const DandDSurroundWrapper = (props: DragWrapperProps) => {
  const {
    array,
    index,
    item,
    itemDragged,
    isDragging,
    dragIndex,
    title,
    children,
    color,
    otherActionItems,
    onDragStart,
    onDragEnd,
    onDrop,
  } = props

  return (
    <SurroundDropWrapper
      array={array}
      index={index}
      dragIndex={dragIndex}
      isDragging={itemDragged === item}
      item={item}
      onDrop={onDrop}
    >
      <DragWrapper
        index={index}
        item={item}
        isItemDragging={isDragging}
        itemDragged={itemDragged}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title={title}
        color={color}
        otherActionItems={otherActionItems}
      >
        {children}
      </DragWrapper>
    </SurroundDropWrapper>
  );
}
 
 
export default DandDSurroundWrapper;