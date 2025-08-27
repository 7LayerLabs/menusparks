#!/bin/bash

# MenuSparks DigitalOcean Automated Deployment Script
# Run this on your DigitalOcean droplet as root

set -e  # Exit on error

echo "🚀 MenuSparks Production Deployment Script"
echo "=========================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

# Get server IP
SERVER_IP=$(curl -s http://checkip.amazonaws.com)
print_status "Server IP detected: $SERVER_IP"

# Step 1: System Update
print_status "Updating system packages..."
apt update && apt upgrade -y

# Step 2: Install Dependencies
print_status "Installing required packages..."
apt install -y \
    docker.io \
    docker-compose \
    git \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw \
    curl \
    wget \
    htop \
    fail2ban

# Step 3: Configure Docker
print_status "Configuring Docker..."
systemctl enable docker
systemctl start docker
docker --version

# Step 4: Configure Firewall
print_status "Setting up firewall..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 2377/tcp  # Docker Swarm management
ufw allow 7946/tcp  # Docker Swarm communication
ufw allow 7946/udp  # Docker Swarm communication
ufw allow 4789/udp  # Docker Swarm overlay network
ufw --force enable

# Step 5: Create deploy user
print_status "Creating deploy user..."
if ! id "deploy" &>/dev/null; then
    adduser deploy --disabled-password --gecos ""
    usermod -aG docker deploy
    usermod -aG sudo deploy
    print_status "Deploy user created"
else
    print_warning "Deploy user already exists"
fi

# Step 6: Set up application directory
print_status "Setting up application directory..."
mkdir -p /home/deploy/menusparks
chown -R deploy:deploy /home/deploy/menusparks

# Step 7: Initialize Docker Swarm
print_status "Initializing Docker Swarm..."
if docker info | grep -q "Swarm: active"; then
    print_warning "Docker Swarm already initialized"
else
    docker swarm init --advertise-addr $SERVER_IP
    print_status "Docker Swarm initialized"
fi

# Step 8: Create environment file template
print_status "Creating environment file template..."
cat > /home/deploy/menusparks/.env.production.template << 'EOF'
# MenuSparks Production Environment Variables
# IMPORTANT: Fill in all values before deploying!

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database Configuration
DB_USER=menusparks
DB_PASSWORD=CHANGE_THIS_TO_STRONG_PASSWORD
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
EOF

chown deploy:deploy /home/deploy/menusparks/.env.production.template

# Step 9: Create deployment script
print_status "Creating deployment helper script..."
cat > /home/deploy/deploy.sh << 'EOF'
#!/bin/bash

# MenuSparks Deployment Helper
set -e

cd /home/deploy/menusparks

echo "🚀 Deploying MenuSparks..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production not found!"
    echo "Please copy .env.production.template to .env.production and fill in your values"
    exit 1
fi

# Copy env file to the right location
cp .env.production menspk-main/menspk-main/.env.production

# Build Docker image
echo "Building Docker image..."
cd menspk-main
docker build -t menusparks:latest -f Dockerfile .

# Deploy stack
echo "Deploying to Docker Swarm..."
docker stack deploy -c docker-compose.swarm.yml menusparks

echo "✅ Deployment complete!"
echo "Check status with: docker service ls"
EOF

chmod +x /home/deploy/deploy.sh
chown deploy:deploy /home/deploy/deploy.sh

# Step 10: Create monitoring script
print_status "Creating monitoring script..."
cat > /home/deploy/monitor.sh << 'EOF'
#!/bin/bash

# Health check
HEALTH_URL="http://localhost/api/health"
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f $HEALTH_URL > /dev/null 2>&1; then
        echo "$(date): Health check passed"
        exit 0
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 5
done

echo "$(date): Health check failed after $MAX_RETRIES attempts"
# Restart the service
docker service update --force menusparks_menusparks
EOF

chmod +x /home/deploy/monitor.sh
chown deploy:deploy /home/deploy/monitor.sh

# Step 11: Create backup script
print_status "Creating backup script..."
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash

# Database backup script
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker exec $(docker ps -q -f name=postgres) pg_dump -U menusparks menusparks_db > $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql"
EOF

chmod +x /home/deploy/backup.sh
chown deploy:deploy /home/deploy/backup.sh

# Step 12: Set up cron jobs
print_status "Setting up automated tasks..."
cat > /tmp/deploy-crontab << 'EOF'
# Health check every 5 minutes
*/5 * * * * /home/deploy/monitor.sh >> /home/deploy/monitor.log 2>&1

# Daily backup at 2 AM
0 2 * * * /home/deploy/backup.sh >> /home/deploy/backup.log 2>&1

# SSL renewal check weekly
0 3 * * 0 certbot renew --quiet && systemctl reload nginx
EOF

crontab -u deploy /tmp/deploy-crontab
rm /tmp/deploy-crontab

# Step 13: Configure fail2ban for security
print_status "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Step 14: Create nginx configuration template
print_status "Creating nginx configuration..."
cat > /etc/nginx/sites-available/menusparks << 'EOF'
upstream menusparks_app {
    server 127.0.0.1:80;
}

server {
    listen 80;
    server_name menusparks.com www.menusparks.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# Note: Uncomment this section after obtaining SSL certificates
# server {
#     listen 443 ssl http2;
#     server_name menusparks.com www.menusparks.com;
#
#     ssl_certificate /etc/letsencrypt/live/menusparks.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/menusparks.com/privkey.pem;
#     
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
#     
#     client_max_body_size 10M;
#     
#     location / {
#         proxy_pass http://menusparks_app;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }
# }
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/menusparks /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t && systemctl reload nginx

# Final instructions
echo ""
echo "=========================================="
print_status "Initial setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Switch to deploy user:"
echo "   ${GREEN}su - deploy${NC}"
echo ""
echo "2. Go to application directory:"
echo "   ${GREEN}cd /home/deploy/menusparks${NC}"
echo ""
echo "3. Clone your repository or upload files:"
echo "   ${GREEN}git clone https://github.com/YOUR_USERNAME/menusparks.git .${NC}"
echo ""
echo "4. Configure environment variables:"
echo "   ${GREEN}cp .env.production.template .env.production${NC}"
echo "   ${GREEN}nano .env.production${NC}"
echo ""
echo "5. Deploy the application:"
echo "   ${GREEN}./deploy.sh${NC}"
echo ""
echo "6. Set up SSL certificate (after DNS is configured):"
echo "   ${GREEN}sudo certbot --nginx -d menusparks.com -d www.menusparks.com${NC}"
echo ""
echo "7. Update nginx configuration to enable SSL"
echo ""
echo "=========================================="
echo ""
print_warning "Don't forget to:"
echo "  - Update DNS records to point to $SERVER_IP"
echo "  - Configure Stripe webhook URL"
echo "  - Whitelist server IP in Supabase"
echo ""
print_status "Server IP: $SERVER_IP"
echo "=========================================="