import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';

const VAR_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const parseVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  const re = new RegExp(VAR_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [size, setSize] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

  const variables = useMemo(() => parseVariables(currText), [currText]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const scrollHeight = el.scrollHeight;
    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length), 1);
    const width = Math.min(400, Math.max(200, longestLine * 8 + 32));
    const height = Math.max(80, scrollHeight + 48);

    setSize({ width, height });
  }, [currText]);

  const variableHandles = variables.map((varName, index) => ({
    type: 'target',
    position: 'left',
    idSuffix: `var-${varName}`,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      className="node-text"
      style={{ width: size.width, height: size.height }}
      handles={[
        ...variableHandles,
        { type: 'source', position: 'right', idSuffix: 'output' },
      ]}
    >
      <label className="base-node__field base-node__field--grow">
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
        />
      </label>
    </BaseNode>
  );
};
