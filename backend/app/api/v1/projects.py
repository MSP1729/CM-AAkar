from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.api.deps import get_db
from app.schemas.project import ProjectResponse
from app.models.project import Project

router = APIRouter()

@router.get("", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    """List major projects."""
    result = await db.execute(select(Project))
    return result.scalars().all()
