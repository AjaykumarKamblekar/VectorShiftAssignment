import { draggedNodeTypeRef } from './dndRef';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    draggedNodeTypeRef.current = nodeType;
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.cursor = 'grabbing';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
    draggedNodeTypeRef.current = null;
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      {label}
    </div>
  );
};
