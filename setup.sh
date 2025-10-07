#!/bin/bash

# Video Curator Platform Setup Script
echo "🚀 Setting up Video Curator Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is running"
    else
        print_warning "MongoDB is not running. Please start MongoDB before running the application."
    fi
else
    print_warning "MongoDB is not installed or not in PATH. Please install and start MongoDB."
fi

# Setup Backend
print_status "Setting up backend..."
cd backend

# Copy environment file
if [ ! -f .env ]; then
    cp env.example .env
    print_success "Created .env file from env.example"
    print_warning "Please update the .env file with your MongoDB connection string"
else
    print_warning ".env file already exists, skipping..."
fi

# Install dependencies
print_status "Installing backend dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Setup Frontend
print_status "Setting up frontend..."
cd ../frontend

# Copy environment file
if [ ! -f .env ]; then
    cp env.example .env
    print_success "Created .env file from env.example"
else
    print_warning ".env file already exists, skipping..."
fi

# Install dependencies
print_status "Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

cd ..

print_success "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Update frontend/.env if needed (defaults should work for local development)"
echo "3. Start MongoDB if not already running"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend: cd frontend && npm start"
echo ""
echo "🔗 URLs:"
echo "   Backend: http://localhost:8082"
echo "   Frontend: http://localhost:3000"
echo "   Health Check: http://localhost:8082/health"
echo ""
print_warning "Make sure MongoDB is running before starting the backend!"
