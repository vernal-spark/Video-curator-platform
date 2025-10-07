@echo off
REM Video Curator Platform Setup Script for Windows

echo 🚀 Setting up Video Curator Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js (v16 or higher) first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js version:
node --version

REM Setup Backend
echo [INFO] Setting up backend...
cd backend

REM Copy environment file
if not exist .env (
    copy env.example .env
    echo [SUCCESS] Created .env file from env.example
    echo [WARNING] Please update the .env file with your MongoDB connection string
) else (
    echo [WARNING] .env file already exists, skipping...
)

REM Install dependencies
echo [INFO] Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Backend dependencies installed successfully

REM Setup Frontend
echo [INFO] Setting up frontend...
cd ..\frontend

REM Copy environment file
if not exist .env (
    copy env.example .env
    echo [SUCCESS] Created .env file from env.example
) else (
    echo [WARNING] .env file already exists, skipping...
)

REM Install dependencies
echo [INFO] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Frontend dependencies installed successfully

cd ..

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update backend\.env with your MongoDB connection string
echo 2. Update frontend\.env if needed (defaults should work for local development)
echo 3. Start MongoDB if not already running
echo 4. Start the backend: cd backend ^&^& npm run dev
echo 5. Start the frontend: cd frontend ^&^& npm start
echo.
echo 🔗 URLs:
echo    Backend: http://localhost:8082
echo    Frontend: http://localhost:3000
echo    Health Check: http://localhost:8082/health
echo.
echo [WARNING] Make sure MongoDB is running before starting the backend!
pause
