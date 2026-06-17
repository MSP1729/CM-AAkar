"""
ActionLog model — real-time action and audit log entries.
"""

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy import Enum as SAEnum

from app.models import Base, UUIDMixin


class ActionLog(Base, UUIDMixin):
    __tablename__ = "action_logs"

    action_code = Column(String(30), unique=True, nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    action_type = Column(String(100), nullable=False)
    details = Column(Text, nullable=True)
    authority = Column(String(200), nullable=False)
    status = Column(
        SAEnum("SUCCESS", "WARNING", "FAILED", "PENDING", name="action_status"),
        default="PENDING",
    )
    risk_level = Column(
        SAEnum("HIGH", "MEDIUM", "LOW", name="risk_level"),
        default="LOW",
    )

    def __repr__(self) -> str:
        return f"<ActionLog {self.action_code} — {self.status}>"
