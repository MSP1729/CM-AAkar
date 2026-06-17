from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.schemas.ingestion import DepartmentDataIngestion
from app.services.ingestion import ingest_department_data

router = APIRouter()

@router.post("/department-data")
async def ingest_department_snapshot(payload: DepartmentDataIngestion, db: AsyncSession = Depends(get_db)):
    """
    Ingest performance data pushed from a department dashboard.
    """
    return await ingest_department_data(db, payload)
