# Deployment Guide

## 🚀 Production Deployment

Once you've tested everything locally and it's working perfectly, follow this guide to deploy your application to production.

---

## Prerequisites for Deployment

- Git account (GitHub, GitLab, etc.)
- Hosting account (Heroku, Vercel, AWS, DigitalOcean, etc.)
- Production MongoDB instance (MongoDB Atlas recommended)
- Domain name (optional)
- SSL certificate (for HTTPS)

---

## Step 1: Prepare for Deployment

### 1.1 Update Environment Variables

In `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager?retryWrites=true
JWT_SECRET=generate_strong_random_key_here
NODE_ENV=production
```

Generate strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.2 Update API Configuration

In `backend/src/server.js`, update CORS for production:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://yourdomain.com'
}));
```

In `frontend/package.json`, update proxy:
```json
"proxy": "https://api.yourdomain.com"
```

### 1.3 Build Frontend

```bash
cd frontend
npm run build
# Creates optimized build/ folder
```

---

## Step 2: Deploy Backend

### Option A: Deploy to Heroku

**Setup:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create team-task-manager-api

# Set environment variables
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main
```

### Option B: Deploy to AWS EC2

**Basic steps:**
```bash
# SSH into EC2 instance
ssh -i key.pem ec2-user@your-instance-ip

# Install Node.js
curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# Clone repository
git clone your-repo-url
cd Team\ Task\ Manager/backend

# Install & run
npm install
npm start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name "task-manager-api"
pm2 startup
pm2 save
```

### Option C: Deploy to DigitalOcean

1. Create droplet
2. SSH in
3. Follow AWS steps above

---

## Step 3: Deploy Frontend

### Option A: Deploy to Vercel

**Setup:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend folder
cd frontend
vercel
```

Vercel automatically builds and deploys on git push.

### Option B: Deploy to Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy

### Option C: Deploy to AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Step 4: Setup Database (MongoDB Atlas)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account
3. Create cluster
4. Create database user with strong password
5. Get connection string
6. Whitelist all IPs (0.0.0.0/0) for development, restrict for production
7. Use connection string in `MONGODB_URI`

---

## Step 5: Setup CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd backend && npm install && npm test
      - run: cd frontend && npm install && npm run build
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          heroku container:push web --app=your-app-name
          heroku container:release web --app=your-app-name
```

---

## Step 6: Setup Domain & SSL

### Using Heroku
```bash
heroku domains:add api.yourdomain.com
# Add CNAME record to DNS
```

### Using AWS Route53
1. Create hosted zone
2. Add A record pointing to your instance
3. Setup SSL with Let's Encrypt:

```bash
sudo certbot certonly --standalone -d api.yourdomain.com
sudo cp /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem /path/
sudo cp /etc/letsencrypt/live/api.yourdomain.com/privkey.pem /path/
```

---

## Step 7: Monitor & Logging

### Backend Logging
```bash
# On Heroku
heroku logs --tail

# On EC2
tail -f /var/log/application.log
```

### Frontend Monitoring
- Setup Google Analytics
- Setup error tracking (Sentry)
- Monitor performance (New Relic)

---

## Deployment Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB Atlas cluster created and accessible
- [ ] Frontend built with `npm run build`
- [ ] Backend dependencies installed
- [ ] API endpoints tested with production URLs
- [ ] HTTPS/SSL configured
- [ ] Domain pointing to server
- [ ] Email notifications setup (optional)
- [ ] Backup strategy implemented
- [ ] Monitoring and logging enabled
- [ ] Rate limiting configured
- [ ] Security headers added

---

## Security Checklist for Production

- [ ] JWT_SECRET is strong and unique
- [ ] No sensitive data in environment variables file
- [ ] CORS configured for specific domains only
- [ ] Rate limiting enabled on API
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (React does this by default)
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Database backups automated
- [ ] Monitoring and alerts setup
- [ ] Firewall rules configured

---

## Common Deployment Issues

### Issue: Frontend Can't Connect to API
**Solution:**
- Check CORS configuration in backend
- Verify API URL in frontend
- Check firewall rules

### Issue: MongoDB Connection Timeout
**Solution:**
- Whitelist your server IP in MongoDB Atlas
- Check connection string
- Verify network connectivity

### Issue: Node Modules Too Large
**Solution:**
- Use `.slugignore` on Heroku
- Remove devDependencies in production
- Use npm ci instead of npm install

### Issue: Session Lost After Reload
**Solution:**
- Token correctly stored in localStorage
- Check token expiration (7 days)
- Verify JWT secret is same everywhere

---

## Performance Optimization

### Backend
```javascript
// Enable gzip compression
const compression = require('compression');
app.use(compression());

// Cache responses
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});

// Add database indexing
db.collection.createIndex({ email: 1 });
```

### Frontend
- Code splitting with React.lazy()
- Image optimization
- CSS minification
- JavaScript minification (automatic with npm run build)

---

## Scaling Guide

### When to Scale

1. **Database**: 100+ MB data
   - Add read replicas
   - Implement sharding

2. **API**: 100+ requests/second
   - Add load balancer
   - Horizontal scaling (multiple instances)
   - Cache with Redis

3. **Frontend**: 1000+ concurrent users
   - Use CDN (CloudFront, Cloudflare)
   - Enable caching
   - Optimize assets

---

## Backup & Disaster Recovery

### Database Backups
```bash
# MongoDB Atlas automatic backups (enabled by default)
# Manual backup
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

### Code Backups
- Use Git with regular commits
- Push to GitHub/GitLab
- Tag releases

### Server Backups
- Daily snapshots (AWS, DigitalOcean)
- Automated backup service
- Regular testing of restore process

---

## Support & Resources

- Heroku Docs: https://devcenter.heroku.com/
- AWS Docs: https://docs.aws.amazon.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Let's Encrypt: https://letsencrypt.org/
- Vercel Docs: https://vercel.com/docs

---

**Deployment Complete!** 🎉

Your application is now live and accessible to users worldwide.
