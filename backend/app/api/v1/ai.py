from fastapi import APIRouter
from app.schemas.ai import AiQueryRequest, AiQueryResponse, AiSummaryResponse
from app.services.ai import process_ai_query, get_ai_summary

router = APIRouter()

@router.post("/query", response_model=AiQueryResponse)
async def ask_ai(request: AiQueryRequest):
    """Process an AI query."""
    return await process_ai_query(request.query)

@router.get("/summary", response_model=AiSummaryResponse)
async def get_summary():
    """Get AI governance summary and recommendations."""
    return await get_ai_summary()
