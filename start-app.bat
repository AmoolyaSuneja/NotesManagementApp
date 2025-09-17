@echo off
echo ========================================
echo    Starting Notes Manager App 🚀
echo ========================================
echo.

echo 📦 Installing dependencies...
call npm run install-all
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🔍 Checking if .env file exists...
if not exist "backend\.env" (
    echo ⚠️  .env file not found. Running setup first...
    call setup-mongodb.bat
    if %ERRORLEVEL% neq 0 (
        echo ❌ Setup failed
        pause
        exit /b 1
    )
)

echo.
echo 🔍 Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is already running!
) else (
    echo 🚀 Starting MongoDB...
    start /B "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
    
    echo.
    echo ⏳ Waiting for MongoDB to start... (10 seconds)
    timeout /t 10 /nobreak >nul
    
    echo.
    echo 🔍 Verifying MongoDB connection...
    tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
    if "%ERRORLEVEL%"=="0" (
        echo ✅ MongoDB started successfully!
    ) else (
        echo ❌ MongoDB failed to start. Please run setup-mongodb.bat first
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo    Starting Development Servers 🎯
echo ========================================
echo.
echo 🌐 URLs:
echo    - Backend API: http://localhost:5000
echo    - Frontend App: http://localhost:3000
echo    - MongoDB: mongodb://localhost:27017/notes-manager
echo.
echo 💡 Press Ctrl+C to stop both servers
echo.

call npm run dev
