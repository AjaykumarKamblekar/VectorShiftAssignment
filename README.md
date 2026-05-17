# VectorShift Pipeline Builder

Visual pipeline editor (React Flow) with a FastAPI backend that validates graph structure on submit.

**Prerequisites:** Node.js, Python 3.9+

## Running the app

### Backend (port 8000)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Verify: http://localhost:8000 → `{"Ping":"Pong"}`

### Frontend (port 3000)

```bash
cd frontend
npm install
npm start
```

Opens: http://localhost:3000

### Usage

1. Drag nodes from the toolbar onto the canvas and connect them.
2. Click **Submit** (backend must be running).
3. An alert shows node count, edge count, and whether the graph is a DAG.
