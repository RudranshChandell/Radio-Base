@echo off
REM RadioBase Deployment Script for Windows
REM This script helps prepare and test the application for deployment

echo 🚀 RadioBase Deployment Preparation Script
echo ==========================================

REM Check if we're in the right directory
if not exist "radiobase\package.json" (
    echo ❌ Error: Please run this script from the RadioBase root directory
    exit /b 1
)

if not exist "Backend\pom.xml" (
    echo ❌ Error: Please run this script from the RadioBase root directory
    exit /b 1
)

REM Check prerequisites
echo 📋 Checking prerequisites...

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm
    exit /b 1
)

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java is not installed. Please install Java 17+
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Frontend preparation
echo.
echo 🌐 Preparing Frontend...
cd radiobase

REM Install dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Build frontend
echo 🔨 Building frontend...
call npm run build

if errorlevel 1 (
    echo ❌ Frontend build failed
    exit /b 1
) else (
    echo ✅ Frontend build successful
)

cd ..

REM Backend preparation
echo.
echo ⚙️  Preparing Backend...
cd Backend

REM Check if Maven wrapper exists
if not exist "mvnw.cmd" (
    echo ❌ Maven wrapper not found. Please ensure mvnw.cmd is present
    exit /b 1
)

REM Test backend compilation
echo 🔨 Testing backend compilation...
call mvnw.cmd compile -q

if errorlevel 1 (
    echo ❌ Backend compilation failed
    exit /b 1
) else (
    echo ✅ Backend compilation successful
)

cd ..

echo.
echo 🎉 Deployment preparation completed successfully!
echo.
echo 📝 Next steps:
echo 1. Set up your production database
echo 2. Configure environment variables in your hosting platform
echo 3. Deploy backend to your chosen platform (Render, Railway, Heroku)
echo 4. Deploy frontend to Vercel
echo 5. Update environment variables with your production URLs
echo.
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions

pause 