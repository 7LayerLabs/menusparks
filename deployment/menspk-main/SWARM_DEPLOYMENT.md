# MenuSparks Docker Swarm Deployment Guide

## Overview
This guide provides instructions for deploying MenuSparks in Docker Swarm mode, enabling high availability, load balancing, and easy scaling.

## Architecture

The swarm deployment includes:
- **MenuSparks App**: Next.js application (3 replicas by default)
- **Nginx**: Load balancer and reverse proxy (2 replicas)
- **PostgreSQL**: Database server (1 replica)
- **Redis**: Cache and session store (1 replica)

## Prerequisites

- Docker Engine 20.10+ installed
- Docker Compose v2.0+ installed
- At least 2GB RAM available
- Ports 80, 443, and 8080 available

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
# Required: Supabase URLs, API keys, database credentials
```

### 2. Initialize Docker Swarm

**Windows (PowerShell):**
```powershell
.\deploy-swarm.ps1 init
```

**Linux/Mac:**
```bash
chmod +x deploy-swarm.sh
./deploy-swarm.sh init
```

### 3. Deploy the Stack

**Windows (PowerShell):**
```powershell
.\deploy-swarm.ps1 deploy
```

**Linux/Mac:**
```bash
./deploy-swarm.sh deploy
```

### 4. Check Status

**Windows (PowerShell):**
```powershell
.\deploy-swarm.ps1 status
```

**Linux/Mac:**
```bash
./deploy-swarm.sh status
```

## Management Commands

### Scale Services
Scale the MenuSparks application to handle more load:

```bash
# Scale to 5 replicas
./deploy-swarm.sh scale menusparks 5

# Windows
.\deploy-swarm.ps1 scale menusparks 5
```

### Update Services
Deploy new version after code changes:

```bash
# Linux/Mac
./deploy-swarm.sh update

# Windows
.\deploy-swarm.ps1 update
```

### View Logs
Monitor service logs:

```bash
# View MenuSparks logs
./deploy-swarm.sh logs menusparks

# View Nginx logs
./deploy-swarm.sh logs nginx

# Windows
.\deploy-swarm.ps1 logs menusparks
```

### Stop Stack
Remove all services:

```bash
# Linux/Mac
./deploy-swarm.sh stop

# Windows
.\deploy-swarm.ps1 stop
```

## Configuration Details

### Service Replicas
Edit `docker-compose.swarm.yml` to adjust default replicas:

```yaml
services:
  menusparks:
    deploy:
      replicas: 3  # Change this number
```

### Resource Limits
Adjust CPU and memory limits in `docker-compose.swarm.yml`:

```yaml
resources:
  limits:
    cpus: '0.5'
    memory: 512M
  reservations:
    cpus: '0.25'
    memory: 256M
```

### Load Balancing
Nginx automatically load balances across all MenuSparks replicas using the `least_conn` strategy.

## Adding Worker Nodes

To add more nodes to your swarm:

1. On the manager node, get the join token:
```bash
docker swarm join-token worker
```

2. On the worker node, run the join command provided.

## Health Checks

Services include health checks that automatically restart unhealthy containers:

- **MenuSparks**: Checks `/api/health` endpoint
- **PostgreSQL**: Uses `pg_isready` command
- **Nginx**: Returns 200 on `/health`

## Monitoring

View real-time metrics:

```bash
# Service status
docker service ls

# Individual service details
docker service ps menusparks_menusparks

# Node status
docker node ls
```

## Troubleshooting

### Service Won't Start
```bash
# Check service logs
docker service logs menusparks_menusparks

# Inspect service
docker service inspect menusparks_menusparks
```

### Database Connection Issues
- Ensure PostgreSQL is running: `docker service ps menusparks_postgres`
- Check environment variables in `.env`
- Verify network connectivity

### Performance Issues
- Scale up replicas: `./deploy-swarm.sh scale menusparks 5`
- Check resource usage: `docker stats`
- Review service constraints in `docker-compose.swarm.yml`

## Production Considerations

### SSL/TLS Setup
1. Obtain SSL certificates
2. Place them in `./ssl/` directory
3. Uncomment SSL configuration in `nginx.conf`
4. Redeploy: `./deploy-swarm.sh update`

### Backup Strategy
```bash
# Backup PostgreSQL
docker exec $(docker ps -q -f name=postgres) \
  pg_dump -U menusparks menusparks_db > backup.sql

# Backup volumes
docker run --rm -v menusparks_postgres-data:/data \
  -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

### Monitoring and Alerting
Consider adding:
- Prometheus for metrics collection
- Grafana for visualization
- AlertManager for notifications

### Security
- Use secrets management for sensitive data
- Enable Docker Content Trust
- Implement network policies
- Regular security updates

## Advanced Configuration

### Multi-Region Deployment
For global availability:
1. Set up swarm clusters in multiple regions
2. Use global load balancer (CloudFlare, AWS ALB)
3. Implement database replication

### Auto-scaling
Implement auto-scaling based on metrics:
```yaml
deploy:
  replicas: 3
  update_config:
    parallelism: 1
    delay: 10s
  restart_policy:
    condition: any
    max_attempts: 3
```

## Support

For issues or questions:
- Check service logs: `docker service logs -f <service_name>`
- Review Docker Swarm docs: https://docs.docker.com/engine/swarm/
- Contact support team

## Next Steps

1. Configure monitoring and alerting
2. Set up automated backups
3. Implement CI/CD pipeline
4. Configure SSL certificates
5. Set up log aggregation