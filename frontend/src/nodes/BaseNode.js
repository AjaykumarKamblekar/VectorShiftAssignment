import { Handle, Position } from 'reactflow';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({ id, title, className = '', handles = [], children, style }) => {
  return (
    <div className={`base-node ${className}`} style={style}>
      {handles.map((handle) => (
        <Handle
          key={handle.idSuffix}
          type={handle.type}
          position={positionMap[handle.position]}
          id={`${id}-${handle.idSuffix}`}
          style={handle.style}
        />
      ))}
      <div className="base-node__header">
        <span>{title}</span>
      </div>
      <div className="base-node__body">{children}</div>
    </div>
  );
};
