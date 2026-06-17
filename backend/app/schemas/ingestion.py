from pydantic import BaseModel, ConfigDict, Field
from typing import List
from datetime import datetime


class DistrictDataPayload(BaseModel):
    district_id: str = Field(..., description="Department-specific district identifier")
    district_name: str = Field(..., description="Name of the district")
    funds_allocated: int = Field(0, description="Total funds allocated in rupees")
    funds_released: int = Field(0, description="Total funds released in rupees")
    funds_spent: int = Field(0, description="Total funds spent in rupees")
    total_projects: int = Field(0, description="Total number of projects")
    projects_completed: int = Field(0, description="Number of completed projects")
    projects_delayed: int = Field(0, description="Number of delayed projects")

    model_config = ConfigDict(extra='ignore')


class DepartmentDataIngestion(BaseModel):
    department: str = Field(..., description="Full name of the department pushing data")
    last_updated: datetime = Field(..., description="Timestamp of the snapshot")
    district_data: List[DistrictDataPayload] = Field(..., description="Array of district performance metrics")

    model_config = ConfigDict(extra='ignore')
