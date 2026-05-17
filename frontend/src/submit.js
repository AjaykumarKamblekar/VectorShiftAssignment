import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const formData = new FormData();
    formData.append('pipeline', JSON.stringify({ nodes, edges }));

    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const { num_nodes, num_edges, is_dag } = await res.json();
      alert(
        `Pipeline analysis:\n\n` +
          `Nodes: ${num_nodes}\n` +
          `Edges: ${num_edges}\n` +
          `Is DAG: ${is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert(`Error submitting pipeline: ${err.message}`);
    }
  };

  return (
    <button type="button" className="submit-btn" onClick={handleSubmit}>
      Submit
    </button>
  );
};
