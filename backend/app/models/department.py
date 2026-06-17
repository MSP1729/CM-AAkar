"""
Department model — represents a government department (PWD, Health, Education, etc.).
"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.models import Base, UUIDMixin, TimestampMixin


class Department(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "departments"

    name = Column(String(200), unique=True, nullable=False)
    code = Column(String(50), unique=True, nullable=False, index=True)

    # Relationships
    department_data = relationship(
        "DepartmentDistrictData", back_populates="department", lazy="selectin"
    )
    fund_allocations = relationship(
        "FundAllocation", back_populates="department", lazy="selectin"
    )
    projects = relationship("Project", back_populates="department", lazy="selectin")

    def __repr__(self) -> str:
        return f"<Department {self.code} — {self.name}>"
