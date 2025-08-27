# MenuSparks Production Setup Checklist

## 🎯 Quick Start (30 minutes to production!)

### 1️⃣ DigitalOcean Setup (5 min)
- [ ] Create DigitalOcean account
- [ ] Create $6/month droplet (Ubuntu 22.04)
- [ ] Note your droplet IP: _______________

### 2️⃣ Server Setup (10 min)
```bash
# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Download and run setup script
wget https://raw.githubusercontent.com/YOUR_REPO/main/deploy-to-digitalocean.sh
chmod +x deploy-to-digitalocean.sh
./deploy-to-digitalocean.sh
```

### 3️⃣ Get Your API Keys (5 min)

#### Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project → Settings → API
3. Copy:
   - [ ] Project URL: _______________
   - [ ] Anon Key: _______________
   - [ ] Service Role Key: _______________

#### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API Keys:
   - [ ] Live Publishable Key: _______________
   - [ ] Live Secret Key: _______________

#### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create/copy API key:
   - [ ] Gemini API Key: _______________

### 4️⃣ Configure Environment (3 min)
```bash
# Switch to deploy user
su - deploy
cd /home/deploy/menusparks

# Edit environment file
cp .env.production.template .env.production
nano .env.production
# Paste your API keys from above
```

### 5️⃣ Deploy Application (5 min)
```bash
# Clone your code (or upload via SFTP)
git clone YOUR_REPOSITORY_URL .

# Run deployment
./deploy.sh
```

### 6️⃣ Domain Setup (2 min)

#### In your domain registrar:
- [ ] Add A record: @ → YOUR_DROPLET_IP
- [ ] Add A record: www → YOUR_DROPLET_IP

### 7️⃣ SSL Certificate (2 min)
```bash
# After DNS propagates (5-30 min)
sudo certbot --nginx -d menusparks.com -d www.menusparks.com
```

## ✅ Verification Checklist

### Basic Checks
- [ ] Website loads: https://menusparks.com
- [ ] SSL padlock shows in browser
- [ ] API health check works: https://menusparks.com/api/health

### Functionality Tests
- [ ] Email signup saves to Supabase
- [ ] Pricing page loads
- [ ] Stripe checkout opens (test mode first)
- [ ] Contact form works

### Production Tasks
- [ ] Update Stripe webhook URL to: https://menusparks.com/api/stripe/webhook
- [ ] Add server IP to Supabase allowed IPs
- [ ] Set up email alerts for monitoring
- [ ] Test a real payment (small amount)

## 🚨 Emergency Commands

### If site is down:
```bash
# Check services
docker service ls

# Restart application
docker service update --force menusparks_menusparks

# Check logs
docker service logs menusparks_menusparks --tail 100
```

### If you need to rollback:
```bash
# Remove current deployment
docker stack rm menusparks

# Redeploy previous version
cd /home/deploy/menusparks
git checkout HEAD~1
./deploy.sh
```

## 📊 Monitoring

### Check application health:
```bash
curl https://menusparks.com/api/health
```

### View real-time logs:
```bash
docker service logs menusparks_menusparks -f
```

### Check resource usage:
```bash
docker stats
htop
```

## 💰 Monthly Costs

| Service | Cost |
|---------|------|
| DigitalOcean Droplet | $6/month |
| Domain (if new) | ~$1/month |
| **Total** | **$7/month** |

## 📞 Support Contacts

- **DigitalOcean Support**: https://www.digitalocean.com/support
- **Supabase Support**: https://supabase.com/dashboard/support
- **Stripe Support**: https://support.stripe.com

## 🎉 You're Live!

Once everything is checked off, MenuSparks is ready for customers!

### Next Steps:
1. Share with beta testers
2. Monitor first 24 hours closely
3. Set up Google Analytics
4. Start marketing!

---

**Pro Tip**: Save this checklist and your API keys in a secure password manager!