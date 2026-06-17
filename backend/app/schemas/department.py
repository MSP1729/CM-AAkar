from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from uuid import UUID


class DepartmentBase(BaseModel):
    name: str = Field(..., description="Full department name")
    code: str = Field(..., description="Short code (e.g., PWD)")


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentResponse(DepartmentBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)
