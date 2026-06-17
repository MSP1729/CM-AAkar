"""
DepartmentDistrictData — ingested snapshot from department API.
Each row = one department × one district at a point in time.
"""

from sqlalchemy import Column, BigInteger, Integer, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin


class DepartmentDistrictData(Base, UUIDMixin):
    __tablename__ = "department_district_data"

    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    district_id = Column(
        UUID(as_uuid=True),
        ForeignKey("districts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Raw values from the department API response
    funds_allocated = Column(BigInteger, default=0)
    funds_released = Column(BigInteger, default=0)
    funds_spent = Column(BigInteger, default=0)
    total_projects = Column(Integer, default=0)
    projects_completed = Column(Integer, default=0)
    projects_delayed = Column(Integer, default=0)

    # Timestamps
    snapshot_timestamp = Column(DateTime(timezone=True), nullable=False)
    ingested_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    department = relationship("Department", back_populates="department_data")
    district = relationship("District", back_populates="department_data")

    def __repr__(self) -> str:
        return (
            f"<DeptDistData dept={self.department_id} "
            f"dist={self.district_id} @{self.snapshot_timestamp}>"
        )
