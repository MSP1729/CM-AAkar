"""
District model — represents a Delhi NCT district.
"""

from sqlalchemy import Column, String, Float, Integer, Enum as SAEnum
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin, TimestampMixin


class District(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "districts"

    district_code = Column(String(20), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)

    # Computed / aggregated fields
    governance_score = Column(Float, default=0.0)
    rank = Column(Integer, default=0)
    active_projects = Column(Integer, default=0)
    completed_projects = Column(Integer, default=0)
    delayed_projects = Column(Integer, default=0)
    fund_utilization_pct = Column(Float, default=0.0)
    pending_files = Column(Integer, default=0)
    status = Column(
        SAEnum("Optimal", "Warning", "Critical", name="district_status"),
        default="Warning",
    )

    # Geo coordinates for heatmap
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Relationships
    department_data = relationship(
        "DepartmentDistrictData", back_populates="district", lazy="selectin"
    )
    projects = relationship("Project", back_populates="district", lazy="selectin")
    officers = relationship("Officer", back_populates="district", lazy="selectin")

    def __repr__(self) -> str:
        return f"<District {self.district_code} — {self.name}>"
