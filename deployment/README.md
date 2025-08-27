# Deployment Configuration

This folder contains all deployment-related files and scripts.

## Structure:
- `/menspk-main/` - Docker and container deployment files
  - Dockerfile
  - docker-compose.yml files
  - nginx configurations
  - Swarm deployment scripts

- `deploy-to-digitalocean.sh` - DigitalOcean deployment script

## Current Deployment:
- **Production**: Vercel (auto-deploys from GitHub main branch)
- **URL**: https://menusparks.com
- **Alternative**: Docker/Swarm setup available for self-hosting