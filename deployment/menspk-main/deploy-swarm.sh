#!/bin/bash

# MenuSparks Docker Swarm Deployment Script
# Usage: ./deploy-swarm.sh [init|deploy|scale|update|status|stop]

set -e

# Configuration
STACK_NAME="menusparks"
COMPOSE_FILE="docker-compose.swarm.yml"
IMAGE_TAG="${IMAGE_TAG:-latest}"
REGISTRY="${REGISTRY:-}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
}

# Initialize Docker Swarm
init_swarm() {
    log_info "Initializing Docker Swarm..."
    
    if docker info 2>/dev/null | grep -q "Swarm: active"; then
        log_warning "Swarm is already initialized"
    else
        docker swarm init
        log_info "Swarm initialized successfully"
    fi
    
    # Get join token for workers
    log_info "Worker join token:"
    docker swarm join-token worker
}

# Build and push image
build_image() {
    log_info "Building MenuSparks Docker image..."
    docker build -t ${STACK_NAME}:${IMAGE_TAG} .
    
    if [ ! -z "$REGISTRY" ]; then
        log_info "Pushing image to registry ${REGISTRY}..."
        docker tag ${STACK_NAME}:${IMAGE_TAG} ${REGISTRY}/${STACK_NAME}:${IMAGE_TAG}
        docker push ${REGISTRY}/${STACK_NAME}:${IMAGE_TAG}
    fi
}

# Deploy stack to swarm
deploy_stack() {
    log_info "Deploying MenuSparks stack to swarm..."
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        log_error ".env file not found. Please create it with required environment variables."
        exit 1
    fi
    
    # Export environment variables from .env
    export $(cat .env | grep -v '^#' | xargs)
    
    # Build image first
    build_image
    
    # Deploy stack
    docker stack deploy -c ${COMPOSE_FILE} ${STACK_NAME}
    
    log_info "Stack deployed successfully"
    log_info "Checking service status..."
    sleep 5
    docker stack services ${STACK_NAME}
}

# Scale services
scale_service() {
    SERVICE=$1
    REPLICAS=$2
    
    if [ -z "$SERVICE" ] || [ -z "$REPLICAS" ]; then
        log_error "Usage: ./deploy-swarm.sh scale <service_name> <replicas>"
        exit 1
    fi
    
    log_info "Scaling ${SERVICE} to ${REPLICAS} replicas..."
    docker service scale ${STACK_NAME}_${SERVICE}=${REPLICAS}
}

# Update services with new image
update_services() {
    log_info "Updating services with new image..."
    
    # Build new image
    build_image
    
    # Update main service
    docker service update \
        --image ${STACK_NAME}:${IMAGE_TAG} \
        --update-parallelism 1 \
        --update-delay 10s \
        ${STACK_NAME}_menusparks
    
    log_info "Services updated successfully"
}

# Show stack status
show_status() {
    log_info "Stack Services:"
    docker stack services ${STACK_NAME}
    
    echo ""
    log_info "Service Tasks:"
    docker service ps ${STACK_NAME}_menusparks --no-trunc
    
    echo ""
    log_info "Stack Networks:"
    docker network ls --filter "label=com.docker.stack.namespace=${STACK_NAME}"
}

# Stop and remove stack
stop_stack() {
    log_warning "Removing MenuSparks stack..."
    docker stack rm ${STACK_NAME}
    
    log_info "Waiting for stack removal..."
    while [ $(docker service ls --filter "label=com.docker.stack.namespace=${STACK_NAME}" -q | wc -l) -gt 0 ]; do
        sleep 2
    done
    
    log_info "Stack removed successfully"
}

# View logs
view_logs() {
    SERVICE=${1:-menusparks}
    log_info "Viewing logs for service: ${SERVICE}"
    docker service logs -f ${STACK_NAME}_${SERVICE}
}

# Main script logic
check_docker

case "$1" in
    init)
        init_swarm
        ;;
    deploy)
        deploy_stack
        ;;
    scale)
        scale_service $2 $3
        ;;
    update)
        update_services
        ;;
    status)
        show_status
        ;;
    stop)
        stop_stack
        ;;
    logs)
        view_logs $2
        ;;
    *)
        echo "MenuSparks Docker Swarm Deployment Script"
        echo ""
        echo "Usage: $0 {init|deploy|scale|update|status|stop|logs}"
        echo ""
        echo "Commands:"
        echo "  init    - Initialize Docker Swarm"
        echo "  deploy  - Build and deploy the stack"
        echo "  scale   - Scale a service (e.g., scale menusparks 5)"
        echo "  update  - Update services with new image"
        echo "  status  - Show stack status"
        echo "  stop    - Stop and remove the stack"
        echo "  logs    - View service logs (e.g., logs menusparks)"
        exit 1
        ;;
esac