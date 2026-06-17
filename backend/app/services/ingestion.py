import logging

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.schemas.ingestion import DepartmentDataIngestion
from app.models.department import Department
from app.models.district import District
from app.models.department_district_data import DepartmentDistrictData
from app.models.fund_allocation import FundAllocation
from app.services.scoring import recompute_district_scores_and_ranks
from app.services.kpi import invalidate_kpi_cache

logger = logging.getLogger(__name__)

_DELHI_DISTRICTS = {
    "NDD_01": "New Delhi",
    "SD_02": "South Delhi",
    "ND_03": "North Delhi",
    "CD_04": "Central Delhi",
    "WD_05": "West Delhi",
    "ED_06": "East Delhi",
    "NED_07": "North East Delhi",
    "NWD_08": "North West Delhi",
    "SWD_09": "South West Delhi",
    "SED_10": "South East Delhi",
    "SDD_11": "Shahdara",
}


async def _get_or_create_department(db: AsyncSession, dept_name: str) -> Department:
    result = await db.execute(select(Department).filter_by(name=dept_name))
    dept = result.scalar_one_or_none()
    if not dept:
        code = "".join([word[0] for word in dept_name.replace("(", "").replace(")", "").split()]).upper()
        dept = Department(name=dept_name, code=code)
        db.add(dept)
        await db.flush()
    return dept


async def _get_district_by_name_or_id(db: AsyncSession, district_name: str, district_id: str) -> District | None:
    result = await db.execute(select(District).filter_by(district_code=district_id))
    dist = result.scalar_one_or_none()
    if dist:
        return dist

    result = await db.execute(select(District).filter_by(name=district_name))
    dist = result.scalar_one_or_none()
    if dist:
        return dist

    logger.warning("Unknown district id=%s name=%s — skipping", district_id, district_name)
    return None


async def ingest_department_data(db: AsyncSession, payload: DepartmentDataIngestion):
    dept = await _get_or_create_department(db, payload.department)

    for dist_data in payload.district_data:
        dist = await _get_district_by_name_or_id(db, dist_data.district_name, dist_data.district_id)
        if dist is None:
            continue

        snapshot = DepartmentDistrictData(
            department_id=dept.id,
            district_id=dist.id,
            funds_allocated=dist_data.funds_allocated,
            funds_released=dist_data.funds_released,
            funds_spent=dist_data.funds_spent,
            total_projects=dist_data.total_projects,
            projects_completed=dist_data.projects_completed,
            projects_delayed=dist_data.projects_delayed,
            snapshot_timestamp=payload.last_updated,
        )
        db.add(snapshot)

    districts_res = await db.execute(select(District))
    for d in districts_res.scalars().all():
        for incoming in payload.district_data:
            if d.name == incoming.district_name or d.district_code == incoming.district_id:
                d.active_projects = incoming.total_projects - incoming.projects_completed
                d.completed_projects = incoming.projects_completed
                d.delayed_projects = incoming.projects_delayed
                if incoming.funds_allocated > 0:
                    util = (incoming.funds_spent / incoming.funds_allocated) * 100
                    d.fund_utilization_pct = round(util, 1)

    fa_res = await db.execute(select(FundAllocation).filter_by(department_id=dept.id, fiscal_year="2026-27"))
    fa = fa_res.scalar_one_or_none()
    if not fa:
        fa = FundAllocation(department_id=dept.id, fiscal_year="2026-27")
        db.add(fa)

    total_alloc = sum(d.funds_allocated for d in payload.district_data) / 10000000
    total_spent = sum(d.funds_spent for d in payload.district_data) / 10000000

    fa.allocated_cr = total_alloc
    fa.spent_cr = total_spent
    if fa.allocated_cr > 0:
        fa.utilization_pct = round((fa.spent_cr / fa.allocated_cr) * 100, 1)

    await recompute_district_scores_and_ranks(db)
    await invalidate_kpi_cache()

    return {"status": "success", "message": f"Ingested {len(payload.district_data)} district records for {dept.name}"}
