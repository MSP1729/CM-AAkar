from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID


class AuditProtocolBase(BaseModel):
    audit_code: str
    name: str
    category: str
    status: str
    details: Optional[str] = None


class AuditProtocolResponse(AuditProtocolBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


class AuditSummaryResponse(BaseModel):
    audit_score: float
    active_exceptions: int
    protocols_audited: int
