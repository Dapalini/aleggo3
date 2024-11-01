import * as React from 'react';
import DropZone from './DropZone';

const SurroundDropWrapper = ({ 
    array,
    isDragging,
    index,
    dragIndex,
    item,
    children,
    onDrop 
  }: any) => {

  return (
    <>
      { array.length === 0
        ?
        <DropZone     
          isDragging={isDragging}
          index={index}
          item={item}
          onDrop={onDrop}
        /> 
      : null
      }
      { index[item] === 0 
      && !(
        dragIndex[item] === 0 
        && Object.keys(
          index
          ).filter(
            key => key !== item
          ).every(
            key => index[key] === dragIndex[key]
          )
        )
      ?
        <DropZone     
          isDragging={isDragging}
          index={index}
          item={item}
          onDrop={onDrop}
        /> 
      : null
      }
      {children}
      {!(Object.keys(
          index
          ).every(
            key => index[key] === dragIndex[key]
          )
        ) &&
        !(
          Object.keys(
            index
          ).filter(
            key => key !== item
          ).every(
            key => index[key] === dragIndex[key]
          )
          &&
          dragIndex[item] === index[item] + 1
        ) ?
        <DropZone
          isDragging={isDragging}
          index={{...index, [item]: index[item] + 1}}
          item={item} 
          onDrop={onDrop}
        /> 
      : null 
      }
    </>
  )
}
 
export default SurroundDropWrapper;