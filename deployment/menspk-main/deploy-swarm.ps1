# MenuSparks Docker Swarm Deployment Script for Windows
# Usage: .\deploy-swarm.ps1 [init|deploy|scale|update|status|stop]

param(
    [Parameter(Position=0)]
    [string]$Command,
    
    [Parameter(Position=1)]
    [string]$Service,
    
    [Parameter(Position=2)]
    [int]$Replicas
)

# Configuration
$STACK_NAME = "menusparks"
$COMPOSE_FILE = "docker-compose.swarm.yml"
$IMAGE_TAG = if ($env:IMAGE_TAG) { $env:IMAGE_TAG } else { "latest" }
$REGISTRY = $env:REGISTRY

# Helper functions
function Log-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Log-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Log-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

# Check if Docker is installed
function Check-Docker {
    try {
        docker version | Out-Null
    }
    catch {
        Log-Error "Docker is not installed or not running. Please install/start Docker Desktop first."
        exit 1
    }
}

# Initialize Docker Swarm
function Initialize-Swarm {
    Log-Info "Initializing Docker Swarm..."
    
    $swarmInfo = docker info 2>&1 | Select-String "Swarm: active"
    if ($swarmInfo) {
        Log-Warning "Swarm is already initialized"
    }
    else {
        docker swarm init
        Log-Info "Swarm initialized successfully"
    }
    
    # Get join token for workers
    Log-Info "Worker join token:"
    docker swarm join-token worker
}

# Build and push image
function Build-Image {
    Log-Info "Building MenuSparks Docker image..."
    docker build -t "${STACK_NAME}:${IMAGE_TAG}" .
    
    if ($REGISTRY) {
        Log-Info "Pushing image to registry $REGISTRY..."
        docker tag "${STACK_NAME}:${IMAGE_TAG}" "${REGISTRY}/${STACK_NAME}:${IMAGE_TAG}"
        docker push "${REGISTRY}/${STACK_NAME}:${IMAGE_TAG}"
    }
}

# Deploy stack to swarm
function Deploy-Stack {
    Log-Info "Deploying MenuSparks stack to swarm..."
    
    # Check if .env file exists
    if (-not (Test-Path ".env")) {
        Log-Error ".env file not found. Please create it with required environment variables."
        exit 1
    }
    
    # Load environment variables from .env
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], [System.EnvironmentVariableTarget]::Process)
        }
    }
    
    # Build image first
    Build-Image
    
    # Deploy stack
    docker stack deploy -c $COMPOSE_FILE $STACK_NAME
    
    Log-Info "Stack deployed successfully"
    Log-Info "Checking service status..."
    Start-Sleep -Seconds 5
    docker stack services $STACK_NAME
}

# Scale services
function Scale-Service {
    param(
        [string]$ServiceName,
        [int]$ReplicaCount
    )
    
    if (-not $ServiceName -or -not $ReplicaCount) {
        Log-Error "Usage: .\deploy-swarm.ps1 scale <service_name> <replicas>"
        exit 1
    }
    
    Log-Info "Scaling $ServiceName to $ReplicaCount replicas..."
    docker service scale "${STACK_NAME}_${ServiceName}=${ReplicaCount}"
}

# Update services with new image
function Update-Services {
    Log-Info "Updating services with new image..."
    
    # Build new image
    Build-Image
    
    # Update main service
    docker service update `
        --image "${STACK_NAME}:${IMAGE_TAG}" `
        --update-parallelism 1 `
        --update-delay 10s `
        "${STACK_NAME}_menusparks"
    
    Log-Info "Services updated successfully"
}

# Show stack status
function Show-Status {
    Log-Info "Stack Services:"
    docker stack services $STACK_NAME
    
    Write-Host ""
    Log-Info "Service Tasks:"
    docker service ps "${STACK_NAME}_menusparks" --no-trunc
    
    Write-Host ""
    Log-Info "Stack Networks:"
    docker network ls --filter "label=com.docker.stack.namespace=$STACK_NAME"
}

# Stop and remove stack
function Stop-Stack {
    Log-Warning "Removing MenuSparks stack..."
    docker stack rm $STACK_NAME
    
    Log-Info "Waiting for stack removal..."
    while ((docker service ls --filter "label=com.docker.stack.namespace=$STACK_NAME" -q).Count -gt 0) {
        Start-Sleep -Seconds 2
    }
    
    Log-Info "Stack removed successfully"
}

# View logs
function View-Logs {
    param([string]$ServiceName = "menusparks")
    
    Log-Info "Viewing logs for service: $ServiceName"
    docker service logs -f "${STACK_NAME}_${ServiceName}"
}

# Main script logic
Check-Docker

switch ($Command) {
    "init" {
        Initialize-Swarm
    }
    "deploy" {
        Deploy-Stack
    }
    "scale" {
        Scale-Service -ServiceName $Service -ReplicaCount $Replicas
    }
    "update" {
        Update-Services
    }
    "status" {
        Show-Status
    }
    "stop" {
        Stop-Stack
    }
    "logs" {
        View-Logs -ServiceName $Service
    }
    default {
        Write-Host "MenuSparks Docker Swarm Deployment Script" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Usage: .\deploy-swarm.ps1 {init|deploy|scale|update|status|stop|logs}"
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  init    - Initialize Docker Swarm"
        Write-Host "  deploy  - Build and deploy the stack"
        Write-Host "  scale   - Scale a service (e.g., scale menusparks 5)"
        Write-Host "  update  - Update services with new image"
        Write-Host "  status  - Show stack status"
        Write-Host "  stop    - Stop and remove the stack"
        Write-Host "  logs    - View service logs (e.g., logs menusparks)"
        exit 1
    }
}