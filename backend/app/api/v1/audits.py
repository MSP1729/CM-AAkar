from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List

from app.api.deps import get_db
from app.schemas.audit import AuditProtocolResponse, AuditSummaryResponse
from app.models.audit import AuditProtocol

router = APIRouter()

@router.get("", response_model=List[AuditProtocolResponse])
async def list_audits(db: AsyncSession = Depends(get_db)):
    """List all audit protocols."""
    result = await db.execute(select(AuditProtocol))
    return result.scalars().all()

@router.get("/summary", response_model=AuditSummaryResponse)
async def get_audit_summary(db: AsyncSession = Depends(get_db)):
    """Summary metrics for the audit page."""
    total = await db.scalar(select(func.count(AuditProtocol.id))) or 0
    exceptions = await db.scalar(select(func.count(AuditProtocol.id)).filter(AuditProtocol.status == 'Warning')) or 0
    
    passed = await db.scalar(select(func.count(AuditProtocol.id)).filter(AuditProtocol.status == 'Passed')) or 0
    audit_score = round((passed / total) * 100, 1) if total > 0 else 0.0

    return AuditSummaryResponse(
        audit_score=audit_score,
        active_exceptions=exceptions,
        protocols_audited=total
    )
