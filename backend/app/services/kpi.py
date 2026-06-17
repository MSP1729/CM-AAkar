import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
import redis.asyncio as redis
from app.config import settings
from app.models.district import District
from app.models.project import Project

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

async def compute_kpis(db: AsyncSession):
    """
    Computes global KPIs across all districts and departments.
    Results are cached in Redis.
    """
    # Try cache first
    cached_kpis = await redis_client.get("dashboard_kpis")
    if cached_kpis:
        return json.loads(cached_kpis)

    # 1. Total Districts
    dist_count = await db.scalar(select(func.count(District.id))) or 0

    # 2. Active Projects & Delayed Projects
    # We aggregate from districts since that's what's ingested
    result = await db.execute(
        select(
            func.sum(District.active_projects),
            func.sum(District.delayed_projects),
            func.avg(District.fund_utilization_pct),
            func.sum(District.pending_files)
        )
    )
    active_projs, delayed_projs, avg_fund_util, pending_files = result.fetchone()

    active_projs = int(active_projs or 0)
    delayed_projs = int(delayed_projs or 0)
    avg_fund_util = round(float(avg_fund_util or 0), 1)
    pending_files = int(pending_files or 0)

    # Mock critical alerts for now
    critical_alerts = 4

    metrics = [
        {"label": "Total Districts", "value": str(dist_count), "change": "All connected", "isPositive": True},
        {"label": "Active Projects", "value": str(active_projs), "change": "Live data", "isPositive": True},
        {"label": "Delayed Projects", "value": str(delayed_projs), "change": "Needs attention", "isPositive": True, "alertType": "warning"},
        {"label": "Fund Utilization %", "value": f"{avg_fund_util}%", "change": "State average", "isPositive": avg_fund_util > 70},
        {"label": "Pending Files", "value": str(pending_files), "change": "Across all districts", "isPositive": pending_files < 100, "alertType": "warning" if pending_files > 50 else None},
        {"label": "Critical Alerts", "value": str(critical_alerts), "change": "Immediate attention", "isPositive": False, "alertType": "critical"},
    ]

    data = {"metrics": metrics}

    # Cache for 5 mins
    await redis_client.setex("dashboard_kpis", settings.KPI_CACHE_TTL_SECONDS, json.dumps(data))
    
    return data

async def invalidate_kpi_cache():
    await redis_client.delete("dashboard_kpis")
