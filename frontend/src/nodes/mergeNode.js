import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      className="node-merge"
      handles={[
        { type: 'target', position: 'left', idSuffix: 'a', style: { top: '33%' } },
        { type: 'target', position: 'left', idSuffix: 'b', style: { top: '66%' } },
        { type: 'source', position: 'right', idSuffix: 'output' },
      ]}
    >
      <span>Merge two inputs</span>
    </BaseNode>
  );
};
