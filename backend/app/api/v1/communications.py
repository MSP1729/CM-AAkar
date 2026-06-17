from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.api.deps import get_db
from app.schemas.communication import CommunicationResponse, CommunicationCreate
from app.models.communication import Communication
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.get("", response_model=List[CommunicationResponse])
async def list_communications(db: AsyncSession = Depends(get_db)):
    """List communications."""
    result = await db.execute(select(Communication).order_by(desc(Communication.timestamp)))
    return result.scalars().all()

@router.post("", response_model=CommunicationResponse)
async def create_communication(comm: CommunicationCreate, db: AsyncSession = Depends(get_db)):
    """Create a new communication directive."""
    new_comm = Communication(
        comm_code=f"COM-{uuid4().hex[:6].upper()}",
        sender=comm.sender,
        role=comm.role,
        type=comm.type,
        subject=comm.subject,
        timestamp=datetime.utcnow()
    )
    db.add(new_comm)
    await db.flush()
    await db.refresh(new_comm)
    return new_comm
