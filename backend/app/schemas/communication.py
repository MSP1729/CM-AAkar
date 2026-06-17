from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID


class CommunicationBase(BaseModel):
    comm_code: str
    sender: str
    role: str
    type: str
    subject: str


class CommunicationCreate(CommunicationBase):
    pass


class CommunicationUpdate(BaseModel):
    status: str


class CommunicationResponse(CommunicationBase):
    id: UUID
    timestamp: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)
