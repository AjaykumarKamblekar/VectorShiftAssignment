import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id }) => {
  const [seconds, setSeconds] = useState(1);

  return (
    <BaseNode
      id={id}
      title="Delay"
      className="node-delay"
      handles={[{ type: 'source', position: 'right', idSuffix: 'output' }]}
    >
      <label className="base-node__field">
        Seconds:
        <input
          type="number"
          min={0}
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
      </label>
    </BaseNode>
  );
};
