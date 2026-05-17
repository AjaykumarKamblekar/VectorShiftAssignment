import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <div className="app-toolbar">
        <PipelineToolbar />
      </div>
      <ReactFlowProvider>
        <PipelineUI />
        <div className="app-footer">
          <SubmitButton />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
