from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.models.district import District


async def recompute_district_scores_and_ranks(db: AsyncSession):
    """
    Recomputes the District Governance Index (DGI) for all districts,
    determines their status, and assigns a rank.
    """
    result = await db.execute(select(District))
    districts = result.scalars().all()

    for d in districts:
        total = d.active_projects + d.completed_projects
        completion_rate = (d.completed_projects / total) * 100 if total > 0 else 100.0
        inverse_delay = max(0, 100 - d.delayed_projects * 5)

        file_resolution_mock = max(0, 100 - (d.pending_files * 2))
        audit_compliance_mock = 95.0

        score = (
            (0.30 * completion_rate) +
            (0.25 * d.fund_utilization_pct) +
            (0.20 * inverse_delay) +
            (0.15 * file_resolution_mock) +
            (0.10 * audit_compliance_mock)
        )
        d.governance_score = round(score, 1)

        if d.governance_score >= 80:
            d.status = "Optimal"
        elif d.governance_score >= 60:
            d.status = "Warning"
        else:
            d.status = "Critical"

    result = await db.execute(select(District).order_by(desc(District.governance_score)))
    ranked_districts = result.scalars().all()

    for rank, d in enumerate(ranked_districts, 1):
        d.rank = rank
