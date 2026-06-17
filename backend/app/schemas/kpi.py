from pydantic import BaseModel


class KpiMetric(BaseModel):
    label: str
    value: str
    change: str
    isPositive: bool
    alertType: str | None = None


class KpiResponse(BaseModel):
    metrics: list[KpiMetric]
