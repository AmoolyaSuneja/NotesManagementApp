@echo off
echo ========================================
echo    MongoDB Status Check 🔍
echo ========================================
echo.

echo 🔍 Checking MongoDB installation...
if exist "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" (
    echo ✅ MongoDB is installed at: C:\Program Files\MongoDB\Server\8.2\bin\
) else (
    echo ❌ MongoDB not found at expected location
    echo 💡 Please install MongoDB from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

echo.
echo 🔍 Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running!
    echo 📊 Process details:
    tasklist /FI "IMAGENAME eq mongod.exe"
) else (
    echo ❌ MongoDB is not running
    echo 💡 Start MongoDB by running: setup-mongodb.bat
)

echo.
echo 🔍 Checking data directory...
if exist "C:\data\db" (
    echo ✅ Data directory exists: C:\data\db
    dir "C:\data\db" /b 2>nul | find /c /v "" > temp_count.txt
    set /p file_count=<temp_count.txt
    del temp_count.txt
    echo 📁 Files in data directory: %file_count%
) else (
    echo ❌ Data directory not found: C:\data\db
    echo 💡 Create it by running: setup-mongodb.bat
)

echo.
echo 🔍 Checking .env file...
if exist "backend\.env" (
    echo ✅ .env file exists
    echo 📄 Contents:
    type backend\.env
) else (
    echo ❌ .env file not found
    echo 💡 Create it by running: setup-mongodb.bat
)

echo.
echo 🔍 Testing MongoDB connection...
echo db.runCommand({ping: 1}) | "C:\Program Files\MongoDB\Server\8.2\bin\mongo.exe" --quiet 2>nul
if %ERRORLEVEL%==0 (
    echo ✅ MongoDB connection test successful!
) else (
    echo ❌ MongoDB connection test failed
    echo 💡 Make sure MongoDB is running and accessible
)

echo.
echo ========================================
echo    Check Complete! 📋
echo ========================================
echo.
pause
