#!/bin/bash

# Docker management scripts for Video Curator Platform

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

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    print_success "Docker and Docker Compose are installed"
}

# Build and start development environment
dev_up() {
    print_status "Starting development environment..."
    check_docker
    
    docker-compose -f docker-compose.dev.yml up --build -d
    
    if [ $? -eq 0 ]; then
        print_success "Development environment started successfully!"
        echo ""
        echo "🔗 URLs:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend: http://localhost:8082"
        echo "   MongoDB: mongodb://localhost:27017"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs: docker-compose -f docker-compose.dev.yml logs -f"
        echo "   Stop: docker-compose -f docker-compose.dev.yml down"
        echo "   Rebuild: docker-compose -f docker-compose.dev.yml up --build"
    else
        print_error "Failed to start development environment"
        exit 1
    fi
}

# Build and start production environment
prod_up() {
    print_status "Starting production environment..."
    check_docker
    
    docker-compose up --build -d
    
    if [ $? -eq 0 ]; then
        print_success "Production environment started successfully!"
        echo ""
        echo "🔗 URLs:"
        echo "   Frontend: http://localhost:80"
        echo "   Backend: http://localhost:8082"
        echo "   Health Check: http://localhost:8082/health"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs: docker-compose logs -f"
        echo "   Stop: docker-compose down"
        echo "   Rebuild: docker-compose up --build"
    else
        print_error "Failed to start production environment"
        exit 1
    fi
}

# Stop development environment
dev_down() {
    print_status "Stopping development environment..."
    docker-compose -f docker-compose.dev.yml down
    print_success "Development environment stopped"
}

# Stop production environment
prod_down() {
    print_status "Stopping production environment..."
    docker-compose down
    print_success "Production environment stopped"
}

# View logs
logs() {
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Clean up Docker resources
clean() {
    print_status "Cleaning up Docker resources..."
    
    # Stop all containers
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    docker volume prune -f
    
    print_success "Docker cleanup completed"
}

# Show help
show_help() {
    echo "Video Curator Platform - Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev-up     Start development environment"
    echo "  dev-down   Stop development environment"
    echo "  prod-up    Start production environment"
    echo "  prod-down  Stop production environment"
    echo "  logs [dev] View logs (dev for development, prod for production)"
    echo "  clean      Clean up Docker resources"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev-up      # Start development environment"
    echo "  $0 logs dev    # View development logs"
    echo "  $0 clean       # Clean up Docker resources"
}

# Main script logic
case "$1" in
    "dev-up")
        dev_up
        ;;
    "dev-down")
        dev_down
        ;;
    "prod-up")
        prod_up
        ;;
    "prod-down")
        prod_down
        ;;
    "logs")
        logs "$2"
        ;;
    "clean")
        clean
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
