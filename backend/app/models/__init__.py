"""
SQLAlchemy ORM model base and imports.
"""

from sqlalchemy.orm import DeclarativeBase
import uuid
from sqlalchemy import Column, DateTime, func
from sqlalchemy.dialects.postgresql import UUID


class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass


class TimestampMixin:
    """Mixin that adds created_at and updated_at timestamps."""
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class UUIDMixin:
    """Mixin that adds a UUID primary key."""
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )


# Import all models so Alembic can detect them
from app.models.district import District  # noqa: E402, F401
from app.models.department import Department  # noqa: E402, F401
from app.models.department_district_data import DepartmentDistrictData  # noqa: E402, F401
from app.models.project import Project  # noqa: E402, F401
from app.models.officer import Officer  # noqa: E402, F401
from app.models.fund_allocation import FundAllocation  # noqa: E402, F401
from app.models.audit import AuditProtocol  # noqa: E402, F401
from app.models.action_log import ActionLog  # noqa: E402, F401
from app.models.communication import Communication  # noqa: E402, F401
