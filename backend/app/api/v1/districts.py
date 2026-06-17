from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
from uuid import UUID

from app.api.deps import get_db
from app.schemas.district import DistrictResponse
from app.models.district import District

router = APIRouter()

@router.get("", response_model=List[DistrictResponse])
async def list_districts(db: AsyncSession = Depends(get_db)):
    """List all districts, ordered by rank."""
    result = await db.execute(select(District).order_by(District.rank))
    return result.scalars().all()

@router.get("/{district_id}", response_model=DistrictResponse)
async def get_district(district_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a specific district."""
    result = await db.execute(select(District).filter(District.id == district_id))
    dist = result.scalar_one_or_none()
    if not dist:
        raise HTTPException(status_code=404, detail="District not found")
    return dist
