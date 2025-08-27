# MenuSparks DigitalOcean Production Deployment Guide

## 📋 Prerequisites
- DigitalOcean account
- Domain name (menusparks.com)
- Supabase account with project created
- Stripe account with products created

## 🚀 Step 1: Create DigitalOcean Droplet

### Via DigitalOcean Dashboard:
1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Click "Create" → "Droplets"
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic
   - **CPU**: Regular Intel - $6/month (1GB RAM, 25GB SSD)
   - **Region**: NYC or closest to your customers
   - **Authentication**: SSH keys (recommended) or Password
   - **Hostname**: menusparks-prod

### Via Command Line (if you have doctl):
```bash
doctl compute droplet create menusparks-prod \
  --size s-1vcpu-1gb \
  --image ubuntu-22-04-x64 \
  --region nyc1 \
  --ssh-keys YOUR_SSH_KEY_ID
```

## 🔧 Step 2: Initial Server Setup

SSH into your new droplet:
```bash
ssh root@YOUR_DROPLET_IP
```

Run the initial setup:
```bash
# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y docker.io docker-compose git nginx certbot python3-certbot-nginx ufw

# Enable Docker
systemctl enable docker
systemctl start docker

# Set up firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw allow 2377/tcp  # Docker Swarm
ufw allow 7946/tcp  # Docker Swarm
ufw allow 7946/udp  # Docker Swarm
ufw allow 4789/udp  # Docker Swarm overlay
ufw --force enable

# Create deploy user
adduser deploy --disabled-password --gecos ""
usermod -aG docker deploy
usermod -aG sudo deploy

# Set up directory
mkdir -p /home/deploy/menusparks
chown -R deploy:deploy /home/deploy/menusparks
```

## 🐳 Step 3: Deploy MenuSparks

Switch to deploy user:
```bash
su - deploy
cd ~/menusparks
```

Clone and set up the repository:
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/menusparks.git .
# OR upload files via SCP/SFTP

# Initialize Docker Swarm
docker swarm init --advertise-addr YOUR_DROPLET_IP

# Create production .env file
nano .env.production
```

## 🔐 Step 4: Production Environment Variables

Create `.env.production` with real values:
```env
# Supabase Configuration (from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_real_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_real_service_role_key

# Google Gemini API (from Google AI Studio)
GEMINI_API_KEY=your_real_gemini_api_key

# Stripe Configuration (from Stripe dashboard)
STRIPE_SECRET_KEY=sk_live_your_real_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database Configuration
DB_USER=menusparks
DB_PASSWORD=GENERATE_STRONG_PASSWORD_HERE
DB_NAME=menusparks_db
DB_HOST=postgres
DB_PORT=5432

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379

# Node Environment
NODE_ENV=production

# App URL
NEXT_PUBLIC_APP_URL=https://menusparks.com
```

## 🏗️ Step 5: Build and Deploy

```bash
# Copy production env
cp .env.production menspk-main/menspk-main/.env.production

# Build the Docker image
cd menspk-main
docker build -t menusparks:latest -f Dockerfile .

# Deploy the stack
docker stack deploy -c docker-compose.swarm.yml menusparks

# Check deployment status
docker service ls
docker service ps menusparks_menusparks
```

## 🔒 Step 6: SSL Certificate with Let's Encrypt

```bash
# Exit to root user
exit

# Stop nginx if running
systemctl stop nginx

# Get SSL certificate
certbot certonly --standalone -d menusparks.com -d www.menusparks.com \
  --non-interactive --agree-tos --email admin@menusparks.com

# Create nginx configuration
nano /etc/nginx/sites-available/menusparks
```

Add this nginx configuration:
```nginx
upstream menusparks_app {
    server 127.0.0.1:80;
}

server {
    listen 80;
    server_name menusparks.com www.menusparks.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name menusparks.com www.menusparks.com;

    ssl_certificate /etc/letsencrypt/live/menusparks.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/menusparks.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    client_max_body_size 10M;
    
    location / {
        proxy_pass http://menusparks_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_request_buffering off;
    }

    location /api/stripe/webhook {
        proxy_pass http://menusparks_app/api/stripe/webhook;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_http_version 1.1;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/menusparks /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## 🌐 Step 7: DNS Configuration

In your domain registrar (GoDaddy, Namecheap, etc.):

1. Go to DNS settings for menusparks.com
2. Add these records:
```
Type  Name    Value              TTL
A     @       YOUR_DROPLET_IP    3600
A     www     YOUR_DROPLET_IP    3600
```

## ✅ Step 8: Verify Deployment

1. **Check services are running:**
```bash
docker service ls
```

2. **Check application health:**
```bash
curl https://menusparks.com/api/health
```

3. **Test SSL certificate:**
```bash
curl -I https://menusparks.com
```

4. **Monitor logs:**
```bash
docker service logs menusparks_menusparks -f
```

## 🔄 Step 9: Set Up Auto-Renewal for SSL

```bash
# Test renewal
certbot renew --dry-run

# Add to crontab
crontab -e
```

Add this line:
```
0 2 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## 📊 Step 10: Monitoring & Backups

Create monitoring script:
```bash
nano /home/deploy/monitor.sh
```

```bash
#!/bin/bash
# Health check script
if ! curl -f https://menusparks.com/api/health > /dev/null 2>&1; then
    echo "MenuSparks is down!" | mail -s "Alert: MenuSparks Down" admin@menusparks.com
    docker service update --force menusparks_menusparks
fi
```

Add to crontab:
```
*/5 * * * * /home/deploy/monitor.sh
```

## 🚨 Troubleshooting

### Services not starting:
```bash
docker service ps menusparks_menusparks --no-trunc
docker service logs menusparks_menusparks
```

### Database connection issues:
```bash
docker exec -it $(docker ps -q -f name=postgres) psql -U menusparks -d menusparks_db
```

### Restart everything:
```bash
docker stack rm menusparks
sleep 10
docker stack deploy -c docker-compose.swarm.yml menusparks
```

### Check disk space:
```bash
df -h
docker system prune -a  # Clean up Docker
```

## 📝 Maintenance Commands

### Update application:
```bash
cd /home/deploy/menusparks
git pull
docker build -t menusparks:latest -f Dockerfile .
docker service update --image menusparks:latest menusparks_menusparks
```

### View logs:
```bash
docker service logs menusparks_menusparks -f --tail 100
```

### Scale services:
```bash
docker service scale menusparks_menusparks=5
```

### Backup database:
```bash
docker exec $(docker ps -q -f name=postgres) pg_dump -U menusparks menusparks_db > backup_$(date +%Y%m%d).sql
```

## 🎯 Final Checklist

- [ ] Droplet created and configured
- [ ] Docker Swarm initialized
- [ ] Application deployed and running
- [ ] SSL certificate installed
- [ ] DNS configured and propagated
- [ ] Stripe webhooks updated to https://menusparks.com/api/stripe/webhook
- [ ] Supabase allowed your server IP
- [ ] Health monitoring enabled
- [ ] Backup strategy in place
- [ ] Test payment flow works

## 💡 Cost Breakdown

- **DigitalOcean Droplet**: $6/month
- **Domain (if needed)**: ~$12/year
- **Total**: ~$7/month

## 🆘 Support Resources

- [DigitalOcean Community](https://www.digitalocean.com/community)
- [Docker Swarm Docs](https://docs.docker.com/engine/swarm/)
- [Let's Encrypt Docs](https://letsencrypt.org/docs/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)