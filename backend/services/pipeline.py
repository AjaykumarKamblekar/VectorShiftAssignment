import json

from graph.dag import is_dag


def parse_pipeline_json(pipeline: str):
    data = json.loads(pipeline)
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges),
    }
