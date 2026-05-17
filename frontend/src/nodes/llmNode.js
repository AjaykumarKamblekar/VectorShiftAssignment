import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      className="node-llm"
      handles={[
        { type: 'target', position: 'left', idSuffix: 'system', style: { top: `${100 / 3}%` } },
        { type: 'target', position: 'left', idSuffix: 'prompt', style: { top: `${200 / 3}%` } },
        { type: 'source', position: 'right', idSuffix: 'response' },
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
