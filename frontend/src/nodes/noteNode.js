import { BaseNode } from './BaseNode';

export const NoteNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Note" className="node-note" handles={[]}>
      <span>Annotation only</span>
    </BaseNode>
  );
};
