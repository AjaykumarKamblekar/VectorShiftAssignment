import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="app-toolbar__nodes">
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="filter" label="Filter" />
      <DraggableNode type="merge" label="Merge" />
      <DraggableNode type="delay" label="Delay" />
      <DraggableNode type="note" label="Note" />
      <DraggableNode type="api" label="API" />
    </div>
  );
};
