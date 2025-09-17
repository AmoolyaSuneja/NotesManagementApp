@echo off
echo ========================================
echo    MongoDB Setup for Notes Manager App
echo ========================================
echo.

echo 📁 Creating .env file...
if not exist "backend\.env" (
    echo PORT=5000 > backend\.env
    echo MONGODB_URI=mongodb://localhost:27017/notes-manager >> backend\.env
    echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345 >> backend\.env
    echo NODE_ENV=development >> backend\.env
    echo ✅ .env file created successfully!
) else (
    echo ⚠️  .env file already exists, skipping creation.
)

echo.
echo 📂 Creating MongoDB data directory...
mkdir "C:\data\db" 2>nul
if exist "C:\data\db" (
    echo ✅ Data directory ready: C:\data\db
) else (
    echo ❌ Failed to create data directory. Please run as administrator.
    pause
    exit /b 1
)

echo.
echo 🔍 Checking if MongoDB is already running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is already running!
    goto :check_connection
)

echo.
echo 🚀 Starting MongoDB...
start /B "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"

echo.
echo ⏳ Waiting for MongoDB to start... (10 seconds)
timeout /t 10 /nobreak >nul

:check_connection
echo.
echo 🔍 Verifying MongoDB connection...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running successfully!
    echo 🌐 MongoDB is accessible at: mongodb://localhost:27017
) else (
    echo ❌ MongoDB failed to start. Please check:
    echo    1. MongoDB is installed correctly
    echo    2. You have administrator privileges
    echo    3. Port 27017 is not blocked
    echo.
    echo 💡 Try running this script as administrator
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Setup Complete! 🎉
echo ========================================
echo.
echo 📋 Next steps:
echo    1. Install dependencies: npm run install-all
echo    2. Start the app: npm run dev
echo    3. Or start individually:
echo       - Backend: npm run server
echo       - Frontend: npm run client
echo.
echo 🌐 URLs:
echo    - Backend API: http://localhost:5000
echo    - Frontend App: http://localhost:3000
echo    - MongoDB: mongodb://localhost:27017/notes-manager
echo.
pause
