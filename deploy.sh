#!/bin/bash

# RadioBase Deployment Script
# This script helps prepare and test the application for deployment

echo "🚀 RadioBase Deployment Preparation Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "radiobase/package.json" ] || [ ! -f "Backend/pom.xml" ]; then
    echo "❌ Error: Please run this script from the RadioBase root directory"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

if ! command_exists java; then
    echo "❌ Java is not installed. Please install Java 17+"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Frontend preparation
echo ""
echo "🌐 Preparing Frontend..."
cd radiobase

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

# Backend preparation
echo ""
echo "⚙️  Preparing Backend..."
cd Backend

# Check if Maven wrapper exists
if [ ! -f "mvnw" ]; then
    echo "❌ Maven wrapper not found. Please ensure mvnw is present"
    exit 1
fi

# Make mvnw executable
chmod +x mvnw

# Test backend compilation
echo "🔨 Testing backend compilation..."
./mvnw compile -q

if [ $? -eq 0 ]; then
    echo "✅ Backend compilation successful"
else
    echo "❌ Backend compilation failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 Deployment preparation completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Set up your production database"
echo "2. Configure environment variables in your hosting platform"
echo "3. Deploy backend to your chosen platform (Render, Railway, Heroku)"
echo "4. Deploy frontend to Vercel"
echo "5. Update environment variables with your production URLs"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" 