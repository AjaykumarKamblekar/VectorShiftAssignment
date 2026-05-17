import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  const [mode, setMode] = useState('contains');

  return (
    <BaseNode
      id={id}
      title="Filter"
      className="node-filter"
      handles={[
        { type: 'target', position: 'left', idSuffix: 'input' },
        { type: 'source', position: 'right', idSuffix: 'output' },
      ]}
    >
      <label className="base-node__field">
        Mode:
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
        </select>
      </label>
    </BaseNode>
  );
};
