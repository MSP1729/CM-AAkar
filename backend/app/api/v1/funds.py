from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List

from app.api.deps import get_db
from app.schemas.fund import FundAllocationResponse, FundsOverviewResponse
from app.models.fund_allocation import FundAllocation
from app.models.department import Department

router = APIRouter()

@router.get("/overview", response_model=FundsOverviewResponse)
async def get_funds_overview(db: AsyncSession = Depends(get_db)):
    """Overview of total state funds."""
    result = await db.execute(
        select(
            func.sum(FundAllocation.allocated_cr),
            func.sum(FundAllocation.spent_cr)
        )
    )
    alloc, spent = result.fetchone()
    alloc = alloc or 0.0
    spent = spent or 0.0
    util = round((spent / alloc) * 100, 1) if alloc > 0 else 0.0
    
    return FundsOverviewResponse(
        total_allocated_cr=alloc,
        total_spent_cr=spent,
        avg_utilization_pct=util
    )

@router.get("/by-department", response_model=List[FundAllocationResponse])
async def get_funds_by_department(db: AsyncSession = Depends(get_db)):
    """Fund utilization broken down by department."""
    result = await db.execute(select(FundAllocation).join(Department))
    allocations = result.scalars().all()
    
    # Map department name manually for response
    response_data = []
    for alloc in allocations:
        response_data.append(FundAllocationResponse(
            id=alloc.id,
            department_id=alloc.department_id,
            department_name=alloc.department.name,
            fiscal_year=alloc.fiscal_year,
            allocated_cr=alloc.allocated_cr,
            spent_cr=alloc.spent_cr,
            utilization_pct=alloc.utilization_pct
        ))
    return response_data
