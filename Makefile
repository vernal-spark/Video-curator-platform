# Video Curator Platform - Makefile

.PHONY: help dev-up dev-down prod-up prod-down logs clean build test

# Default target
help: ## Show this help message
	@echo "Video Curator Platform - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development commands
dev-up: ## Start development environment
	@echo "🚀 Starting development environment..."
	docker-compose -f docker-compose.dev.yml up --build -d
	@echo "✅ Development environment started!"
	@echo "🔗 Frontend: http://localhost:3000"
	@echo "🔗 Backend: http://localhost:8082"

dev-down: ## Stop development environment
	@echo "🛑 Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down
	@echo "✅ Development environment stopped"

dev-logs: ## View development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-rebuild: ## Rebuild and restart development environment
	@echo "🔄 Rebuilding development environment..."
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.dev.yml up --build -d
	@echo "✅ Development environment rebuilt!"

# Production commands
prod-up: ## Start production environment
	@echo "🚀 Starting production environment..."
	docker-compose up --build -d
	@echo "✅ Production environment started!"
	@echo "🔗 Frontend: http://localhost:80"
	@echo "🔗 Backend: http://localhost:8082"

prod-down: ## Stop production environment
	@echo "🛑 Stopping production environment..."
	docker-compose down
	@echo "✅ Production environment stopped"

prod-logs: ## View production logs
	docker-compose logs -f

prod-rebuild: ## Rebuild and restart production environment
	@echo "🔄 Rebuilding production environment..."
	docker-compose down
	docker-compose up --build -d
	@echo "✅ Production environment rebuilt!"

# Utility commands
logs: ## View logs (use LOGS=dev for development logs)
	@if [ "$(LOGS)" = "dev" ]; then \
		docker-compose -f docker-compose.dev.yml logs -f; \
	else \
		docker-compose logs -f; \
	fi

clean: ## Clean up Docker resources
	@echo "🧹 Cleaning up Docker resources..."
	docker-compose down
	docker-compose -f docker-compose.dev.yml down
	docker image prune -f
	docker volume prune -f
	@echo "✅ Docker cleanup completed"

build: ## Build all Docker images
	@echo "🔨 Building Docker images..."
	docker-compose build
	docker-compose -f docker-compose.dev.yml build
	@echo "✅ All images built successfully"

test: ## Run tests (placeholder for future test implementation)
	@echo "🧪 Running tests..."
	@echo "⚠️  Tests not implemented yet"

# Database commands
db-shell: ## Connect to MongoDB shell
	docker-compose exec mongodb mongosh

db-backup: ## Backup MongoDB database
	@echo "💾 Creating database backup..."
	docker-compose exec mongodb mongodump --db video-curator --out /backup
	@echo "✅ Database backup created"

db-restore: ## Restore MongoDB database from backup
	@echo "📥 Restoring database from backup..."
	docker-compose exec mongodb mongorestore --db video-curator /backup/video-curator
	@echo "✅ Database restored"

# Status commands
status: ## Show status of all containers
	@echo "📊 Container Status:"
	@echo ""
	@echo "Development Environment:"
	@docker-compose -f docker-compose.dev.yml ps
	@echo ""
	@echo "Production Environment:"
	@docker-compose ps

health: ## Check health of all services
	@echo "🏥 Health Check:"
	@echo ""
	@echo "Backend Health:"
	@curl -s http://localhost:8082/health | jq . || echo "Backend not responding"
	@echo ""
	@echo "Frontend Health:"
	@curl -s http://localhost:80/health || echo "Frontend not responding"
