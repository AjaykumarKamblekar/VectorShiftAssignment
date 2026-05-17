import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import { useStore } from './store';
import { draggedNodeTypeRef } from './dndRef';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { DelayNode } from './nodes/delayNode';
import { NoteNode } from './nodes/noteNode';
import { ApiNode } from './nodes/apiNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  merge: MergeNode,
  delay: DelayNode,
  note: NoteNode,
  api: ApiNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const getNodeID = useStore((state) => state.getNodeID);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: `${type}` });

  const resolveDroppedType = (event) => {
    const rawData =
      event.dataTransfer.getData('application/reactflow') ||
      event.dataTransfer.getData('text/plain');
    if (rawData) {
      try {
        const appData = JSON.parse(rawData);
        return appData?.nodeType ?? rawData;
      } catch {
        return rawData;
      }
    }
    return draggedNodeTypeRef.current;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const type = resolveDroppedType(event);
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);
      setNodes((nds) =>
        nds.concat({
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        })
      );
      draggedNodeTypeRef.current = null;
    },
    [reactFlowInstance, getNodeID, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="app-canvas"
      style={{ width: '100%', height: '70vh' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        style={{ width: '100%', height: '100%' }}
      >
        <Background color="#2d3a4f" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
