from fastapi import APIRouter
from app.api.v1 import (
    dashboard, districts, projects, officers, funds, audits, actions, communications, ai, ingestion
)

api_router = APIRouter()
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(districts.router, prefix="/districts", tags=["districts"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(officers.router, prefix="/officers", tags=["officers"])
api_router.include_router(funds.router, prefix="/funds", tags=["funds"])
api_router.include_router(audits.router, prefix="/audits", tags=["audits"])
api_router.include_router(actions.router, prefix="/actions", tags=["actions"])
api_router.include_router(communications.router, prefix="/communications", tags=["communications"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(ingestion.router, prefix="/ingestion", tags=["ingestion"])
