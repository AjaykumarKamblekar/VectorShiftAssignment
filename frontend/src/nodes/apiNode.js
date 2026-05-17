import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id }) => {
  const [url, setUrl] = useState('https://api.example.com');

  return (
    <BaseNode
      id={id}
      title="API"
      className="node-api"
      handles={[
        { type: 'target', position: 'left', idSuffix: 'input' },
        { type: 'source', position: 'right', idSuffix: 'output' },
      ]}
    >
      <label className="base-node__field">
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
    </BaseNode>
  );
};
