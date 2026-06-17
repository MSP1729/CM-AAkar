"""
FundAllocation model — department-level fund summary (aggregated view).
"""

from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin, TimestampMixin


class FundAllocation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "fund_allocations"

    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    fiscal_year = Column(String(20), nullable=False, default="2026-27")
    allocated_cr = Column(Float, default=0.0)  # in Crores
    spent_cr = Column(Float, default=0.0)
    utilization_pct = Column(Float, default=0.0)

    # Relationships
    department = relationship("Department", back_populates="fund_allocations")

    def __repr__(self) -> str:
        return f"<FundAllocation dept={self.department_id} FY={self.fiscal_year}>"
