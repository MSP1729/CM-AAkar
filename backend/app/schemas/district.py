from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from uuid import UUID


class DistrictBase(BaseModel):
    district_code: str = Field(..., description="Unique district code (e.g. NDD_01)")
    name: str = Field(..., description="Name of the district")
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class DistrictCreate(DistrictBase):
    pass


class DistrictUpdate(BaseModel):
    name: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class DistrictResponse(DistrictBase):
    id: UUID
    governance_score: float
    rank: int
    active_projects: int
    completed_projects: int = 0
    delayed_projects: int
    fund_utilization_pct: float
    pending_files: int
    status: str

    model_config = ConfigDict(from_attributes=True)
