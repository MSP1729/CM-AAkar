from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date
from uuid import UUID


class ProjectBase(BaseModel):
    project_code: str
    name: str
    sector: str
    budget_cr: float
    spent_cr: float
    progress_pct: float
    target_date: Optional[date] = None
    status: str


class ProjectCreate(ProjectBase):
    district_id: Optional[UUID] = None
    department_id: Optional[UUID] = None


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    sector: Optional[str] = None
    budget_cr: Optional[float] = None
    spent_cr: Optional[float] = None
    progress_pct: Optional[float] = None
    target_date: Optional[date] = None
    status: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: UUID
    district_id: Optional[UUID] = None
    department_id: Optional[UUID] = None

    model_config = ConfigDict(from_attributes=True)
