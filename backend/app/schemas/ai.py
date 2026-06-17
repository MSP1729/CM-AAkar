from pydantic import BaseModel
from typing import List


class Recommendation(BaseModel):
    id: str
    target: str
    risk: str
    recommendation: str
    category: str


class AiSummaryResponse(BaseModel):
    executiveSummary: str
    recommendations: List[Recommendation]


class AiQueryRequest(BaseModel):
    query: str


class AiQueryResponse(BaseModel):
    id: str
    query: str
    response: str
    timestamp: str
    category: str
