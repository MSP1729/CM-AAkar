from app.schemas.ai import AiQueryResponse, AiSummaryResponse

# Mocks taken from the frontend until an actual LLM integration is built
_MOCK_AI_RESPONSES = [
    {
        "id": "Q-001",
        "query": "Which districts are underperforming?",
        "response": "South East Delhi (score: 55.2) and North East Delhi (59.8) are the lowest-ranked districts. Key issues: high delayed projects (13 and 11 respectively), fund utilization below 58%, and large pending file backlogs.",
        "timestamp": "2026-06-17 14:30",
        "category": "Districts",
    },
    {
        "id": "Q-003",
        "query": "What is the fund utilization status?",
        "response": "Overall Delhi fund utilization stands at 78.6%, up 2.1% vs Q1. Total allocated: ₹4,110 Cr, spent: ₹3,230 Cr.",
        "timestamp": "2026-06-17 11:45",
        "category": "Funds",
    }
]

async def process_ai_query(query: str) -> AiQueryResponse:
    """
    Processes a natural language query.
    Phase 1: Keyword matching. Phase 2: LLM.
    """
    query_lower = query.lower()
    
    for r in _MOCK_AI_RESPONSES:
        if any(word in r["query"].lower() for word in query_lower.split()):
            return AiQueryResponse(**r)
            
    return AiQueryResponse(
        id="Q-GEN",
        query=query,
        response="I am processing your query across the Delhi state datasets. However, I need more specific terms like 'districts' or 'funds'.",
        timestamp="Just now",
        category="General"
    )

async def get_ai_summary() -> AiSummaryResponse:
    return AiSummaryResponse(
        executiveSummary="Overall Delhi governance index stands at 73.7/100. Fund utilization is moderate, but bottlenecks are detected in infrastructure clearance.",
        recommendations=[
            {
                "id": "REC-001",
                "target": "District SDD_11 (Shahdara)",
                "risk": "HIGH",
                "recommendation": "Fast-track clinic construction approvals.",
                "category": "Health",
            }
        ]
    )
