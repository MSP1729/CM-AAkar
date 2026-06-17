"""
Officer model — officer performance and accountability tracking.
"""

from sqlalchemy import Column, String, Float, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin, TimestampMixin


class Officer(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "officers"

    name = Column(String(200), nullable=False)
    designation = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)  # jurisdiction label

    # Performance metrics
    resolved_files = Column(Integer, default=0)
    avg_resolution_days = Column(Float, default=0.0)
    performance_score = Column(Float, default=0.0)
    rank = Column(Integer, default=0)

    # Foreign key
    district_id = Column(
        UUID(as_uuid=True),
        ForeignKey("districts.id", ondelete="SET NULL"),
        nullable=True,
    )

    # Relationships
    district = relationship("District", back_populates="officers")

    def __repr__(self) -> str:
        return f"<Officer {self.name} — {self.designation}>"
