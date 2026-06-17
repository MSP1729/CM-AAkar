from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.api.deps import get_db
from app.schemas.action_log import ActionLogResponse
from app.models.action_log import ActionLog

router = APIRouter()

@router.get("", response_model=List[ActionLogResponse])
async def list_actions(db: AsyncSession = Depends(get_db)):
    """Stream of recent actions (latest first)."""
    result = await db.execute(select(ActionLog).order_by(desc(ActionLog.timestamp)))
    return result.scalars().all()
