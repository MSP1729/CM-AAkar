from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.api.deps import get_db
from app.schemas.officer import OfficerResponse
from app.models.officer import Officer

router = APIRouter()

@router.get("/leaderboard", response_model=List[OfficerResponse])
async def get_officer_leaderboard(db: AsyncSession = Depends(get_db)):
    """Get officer leaderboard ordered by rank."""
    result = await db.execute(select(Officer).order_by(Officer.rank))
    return result.scalars().all()
