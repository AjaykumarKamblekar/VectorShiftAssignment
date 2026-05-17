from fastapi import APIRouter, Form

from services.pipeline import parse_pipeline_json

router = APIRouter()


@router.post("/pipelines/parse")
def parse_pipeline(pipeline: str = Form(...)):
    return parse_pipeline_json(pipeline)
