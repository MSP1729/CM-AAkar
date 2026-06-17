"""
AuditProtocol model — system audit protocols and compliance records.
"""

from sqlalchemy import Column, String, Text
from sqlalchemy import Enum as SAEnum

from app.models import Base, UUIDMixin, TimestampMixin


class AuditProtocol(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "audit_protocols"

    audit_code = Column(String(30), unique=True, nullable=False, index=True)
    name = Column(String(300), nullable=False)
    category = Column(
        SAEnum("Financial", "Operational", "Regulatory", "Security", name="audit_category"),
        nullable=False,
    )
    status = Column(
        SAEnum("Passed", "Warning", "Pending", name="audit_status"),
        default="Pending",
    )
    details = Column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<AuditProtocol {self.audit_code} — {self.status}>"
