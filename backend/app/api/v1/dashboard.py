from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.api.deps import get_db
from app.schemas.kpi import KpiResponse
from app.schemas.district import DistrictResponse
from app.models.district import District
from app.services.kpi import compute_kpis

router = APIRouter()

@router.get("/kpis", response_model=KpiResponse)
async def get_dashboard_kpis(db: AsyncSession = Depends(get_db)):
    """Get aggregated KPI metrics for the dashboard."""
    data = await compute_kpis(db)
    return data

@router.get("/heatmap", response_model=List[DistrictResponse])
async def get_heatmap_data(db: AsyncSession = Depends(get_db)):
    """Get district scores and status for the heatmap visualization."""
    result = await db.execute(select(District))
    return result.scalars().all()
