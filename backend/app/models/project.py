"""
Project model — major government projects tracked on the CM Dashboard.
"""

from sqlalchemy import Column, String, Float, Date, ForeignKey
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin, TimestampMixin


class Project(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "projects"

    project_code = Column(String(30), unique=True, nullable=False, index=True)
    name = Column(String(300), nullable=False)
    sector = Column(
        SAEnum(
            "Infrastructure", "Health", "Education", "Irrigation", "Digital Gov",
            name="project_sector",
        ),
        nullable=False,
    )
    budget_cr = Column(Float, default=0.0)
    spent_cr = Column(Float, default=0.0)
    progress_pct = Column(Float, default=0.0)
    target_date = Column(Date, nullable=True)
    status = Column(
        SAEnum("On Track", "Delayed", "Critical", name="project_status"),
        default="On Track",
    )

    # Foreign keys
    district_id = Column(
        UUID(as_uuid=True),
        ForeignKey("districts.id", ondelete="SET NULL"),
        nullable=True,
    )
    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id", ondelete="SET NULL"),
        nullable=True,
    )

    # Relationships
    district = relationship("District", back_populates="projects")
    department = relationship("Department", back_populates="projects")

    def __repr__(self) -> str:
        return f"<Project {self.project_code} — {self.name}>"
