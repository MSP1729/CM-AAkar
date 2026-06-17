from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class ActionLogBase(BaseModel):
    action_code: str
    action_type: str
    details: Optional[str] = None
    authority: str
    status: str
    risk_level: str


class ActionLogCreate(ActionLogBase):
    timestamp: Optional[datetime] = None


class ActionLogResponse(ActionLogBase):
    id: UUID
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)
