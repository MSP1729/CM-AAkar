#!/bin/bash

echo "Starting PostgreSQL and Redis..."
docker compose up -d

echo "Waiting for containers..."
sleep 5

echo "Starting FastAPI..."
cd backend

source venv/bin/activate

uvicorn app.main:app --reload
