from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.api.router import api_router
from app.config import settings
from app.database import engine, async_session_factory
from app.models import Base
from app.models.district import District

DISTRICTS = [
    {"district_code": "NDD_01", "name": "New Delhi"},
    {"district_code": "SD_02", "name": "South Delhi"},
    {"district_code": "ND_03", "name": "North Delhi"},
    {"district_code": "CD_04", "name": "Central Delhi"},
    {"district_code": "WD_05", "name": "West Delhi"},
    {"district_code": "ED_06", "name": "East Delhi"},
    {"district_code": "NED_07", "name": "North East Delhi"},
    {"district_code": "NWD_08", "name": "North West Delhi"},
    {"district_code": "SWD_09", "name": "South West Delhi"},
    {"district_code": "SED_10", "name": "South East Delhi"},
    {"district_code": "SDD_11", "name": "Shahdara"},
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        for dist_data in DISTRICTS:
            existing = await session.execute(
                select(District).where(District.district_code == dist_data["district_code"])
            )
            if not existing.scalar_one_or_none():
                session.add(District(**dist_data))
        await session.commit()

    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    debug=settings.DEBUG,
)

if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix="/api/v1")


@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok", "version": settings.APP_VERSION}
