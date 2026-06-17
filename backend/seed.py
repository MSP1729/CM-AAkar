import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.config import settings
from app.models import Base
from app.models.district import District

engine = create_async_engine(settings.DATABASE_URL, echo=True)
async_session_factory = async_sessionmaker(engine, expire_on_commit=False)

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


async def seed_data():
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
        print("Database seeded with districts successfully.")


if __name__ == "__main__":
    asyncio.run(seed_data())
