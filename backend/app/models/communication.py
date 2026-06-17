"""
Communication model — directives, inquiries, and emergency dispatches.
"""

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy import Enum as SAEnum

from app.models import Base, UUIDMixin


class Communication(Base, UUIDMixin):
    __tablename__ = "communications"

    comm_code = Column(String(30), unique=True, nullable=False, index=True)
    sender = Column(String(200), nullable=False)
    role = Column(String(100), nullable=False)
    type = Column(
        SAEnum("Directive", "Inquiry", "Emergency", name="comm_type"),
        nullable=False,
    )
    subject = Column(Text, nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    status = Column(
        SAEnum("UNREAD", "READ", "RESPONDED", name="comm_status"),
        default="UNREAD",
    )

    def __repr__(self) -> str:
        return f"<Communication {self.comm_code} — {self.type}>"
