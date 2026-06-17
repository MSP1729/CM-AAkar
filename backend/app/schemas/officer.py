from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID


class OfficerBase(BaseModel):
    name: str
    designation: str
    department: str
    resolved_files: int
    avg_resolution_days: float
    performance_score: float


class OfficerResponse(OfficerBase):
    id: UUID
    rank: int
    district_id: Optional[UUID] = None

    model_config = ConfigDict(from_attributes=True)
