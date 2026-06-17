from pydantic import BaseModel, ConfigDict
from uuid import UUID


class FundAllocationBase(BaseModel):
    fiscal_year: str
    allocated_cr: float
    spent_cr: float
    utilization_pct: float


class FundAllocationResponse(FundAllocationBase):
    id: UUID
    department_id: UUID

    # To send back the department name easily
    department_name: str

    model_config = ConfigDict(from_attributes=True)


class FundsOverviewResponse(BaseModel):
    total_allocated_cr: float
    total_spent_cr: float
    avg_utilization_pct: float
