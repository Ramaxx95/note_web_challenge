#!/bin/bash

echo "Starting backend..."
cd backend
./gradlew bootRun &
BACKEND_PID=$!
cd ..

sleep 5

echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "Project is running correctly..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

wait
