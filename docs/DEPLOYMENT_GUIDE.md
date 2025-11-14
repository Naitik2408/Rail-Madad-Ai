# Rail Madad - Deployment Guide

Complete guide for deploying the Rail Madad application to production.

---

## 📋 Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│   Frontend      │────────▶│   Backend API   │────────▶│   MongoDB       │
│   (Vercel)      │         │   (Railway)     │         │   (Atlas)       │
│   React + Vite  │         │   Node + TS     │         │   Cloud DB      │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new project: "Rail-Madad"

### Step 2: Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (AWS, Mumbai recommended for India)
4. Cluster name: `rail-madad-cluster`
5. Click "Create"

### Step 3: Configure Security

1. **Database Access**:
   - Click "Database Access" in left sidebar
   - Add new database user
   - Username: `railmadad-admin`
   - Password: Generate secure password (save it!)
   - User privileges: "Read and write to any database"
   - Add user

2. **Network Access**:
   - Click "Network Access" in left sidebar
   - Add IP Address
   - Click "Allow access from anywhere" (0.0.0.0/0)
   - For production, limit to your server IPs
   - Add entry

### Step 4: Get Connection String

1. Go to "Databases" tab
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://railmadad-admin:<password>@rail-madad-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `/rail-madad-ai`
   ```
   mongodb+srv://railmadad-admin:YOUR_PASSWORD@rail-madad-cluster.xxxxx.mongodb.net/rail-madad-ai?retryWrites=true&w=majority
   ```

---

## 🚂 Backend Deployment (Railway)

### Step 1: Prepare Backend for Deployment

1. Ensure `backend/.gitignore` includes:
   ```
   node_modules
   dist
   .env
   *.log
   ```

2. Update `backend/package.json` - ensure these scripts exist:
   ```json
   {
     "scripts": {
       "build": "tsc",
       "start": "node dist/server.js",
       "dev": "nodemon --exec ts-node src/server.ts"
     }
   }
   ```

### Step 2: Create Railway Account

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your `Rail-Madad-Ai` repository

### Step 3: Configure Railway Project

1. **Add Root Directory**:
   - Settings → Service Settings
   - Root Directory: `backend`

2. **Add Environment Variables**:
   Click "Variables" tab and add:

   ```bash
   NODE_ENV=production
   PORT=5000
   API_VERSION=v1
   
   # MongoDB (from Atlas)
   MONGODB_URI=mongodb+srv://railmadad-admin:YOUR_PASSWORD@rail-madad-cluster.xxxxx.mongodb.net/rail-madad-ai?retryWrites=true&w=majority
   
   # JWT Secrets (generate secure random strings)
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   JWT_EXPIRE=24h
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-different-from-above
   JWT_REFRESH_EXPIRE=7d
   
   # CORS (your frontend URL - will update after Vercel deployment)
   CORS_ORIGIN=https://your-frontend-app.vercel.app
   
   # AI Service (optional - can add later)
   AI_SERVICE_URL=http://localhost:8000
   AI_SERVICE_TIMEOUT=5000
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # Logging
   LOG_LEVEL=info
   
   # Seed Admin
   SEED_ADMIN_EMAIL=admin@railmadad.com
   SEED_ADMIN_PASSWORD=ChangeThis@Prod123
   SEED_ADMIN_NAME=System Administrator
   ```

   **Important**: Generate strong secrets for production!
   ```bash
   # Generate secrets on your local machine
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Build Configuration**:
   - Settings → Build
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Step 4: Deploy

1. Railway will automatically deploy on push
2. Wait for build to complete
3. Note your Railway URL: `https://your-app.up.railway.app`

### Step 5: Seed Production Database

1. Click on "Deploy" in Railway
2. Select your service
3. Go to "Settings" → "Deployments"
4. Click the 3 dots on latest deployment → "View Logs"
5. Or use Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run seed command
railway run npm run seed
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend.up.railway.app/api/v1
   ```

2. Ensure `frontend/.gitignore` includes:
   ```
   node_modules
   dist
   .env
   .env.local
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import `Rail-Madad-Ai` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Environment Variables

Add in Vercel project settings:

```bash
VITE_API_URL=https://your-backend.up.railway.app/api/v1
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment
3. Note your Vercel URL: `https://rail-madad-ai.vercel.app`

### Step 5: Update Backend CORS

Go back to Railway and update `CORS_ORIGIN`:

```bash
CORS_ORIGIN=https://rail-madad-ai.vercel.app
```

Railway will auto-redeploy with new settings.

---

## 🔐 Production Security Checklist

### Backend

- [ ] Strong JWT secrets (32+ characters, random)
- [ ] Changed default admin password
- [ ] CORS restricted to frontend domain only
- [ ] Rate limiting enabled
- [ ] MongoDB user has minimal required permissions
- [ ] MongoDB network access restricted (not 0.0.0.0/0)
- [ ] Environment variables properly set
- [ ] No `.env` file in git
- [ ] HTTPS enabled (Railway provides this)
- [ ] Error messages don't expose sensitive info

### Frontend

- [ ] API URL points to production backend
- [ ] No sensitive data in frontend code
- [ ] HTTPS enabled (Vercel provides this)
- [ ] Environment variables properly set

### Database

- [ ] Strong database password
- [ ] Regular backups enabled (Atlas provides this)
- [ ] Monitoring alerts configured
- [ ] IP whitelist configured

---

## 📊 Post-Deployment Testing

### 1. Test Backend Health

```bash
curl https://your-backend.up.railway.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Rail Madad API is running",
  "timestamp": "2024-11-12T...",
  "environment": "production"
}
```

### 2. Test Admin Login

```bash
curl -X POST https://your-backend.up.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@railmadad.com",
    "password": "ChangeThis@Prod123"
  }'
```

### 3. Test Frontend

1. Open `https://rail-madad-ai.vercel.app`
2. Navigate to complaint submission
3. Submit a test complaint
4. Login as admin
5. View dashboard
6. Check complaint list
7. Update complaint status

---

## 🔄 CI/CD (Automatic Deployments)

Both Railway and Vercel automatically deploy when you push to `main` branch:

```bash
git add .
git commit -m "Update: feature description"
git push origin main
```

- Railway: Watches `backend/` directory
- Vercel: Watches `frontend/` directory

---

## 📈 Monitoring & Logs

### Railway (Backend)

1. Go to Railway dashboard
2. Click your service
3. "Deployments" tab → View logs
4. "Metrics" tab → CPU, Memory, Network usage

### Vercel (Frontend)

1. Go to Vercel dashboard
2. Select project
3. "Analytics" tab → Page views, performance
4. "Logs" tab → Runtime logs

### MongoDB Atlas

1. Go to Atlas dashboard
2. "Metrics" tab → DB operations, connections
3. "Performance Advisor" → Query optimization
4. "Alerts" → Configure email alerts

---

## 🐛 Troubleshooting

### Backend won't start

1. Check Railway logs for errors
2. Verify all environment variables are set
3. Check MongoDB connection string is correct
4. Ensure build completed successfully

### Frontend can't connect to backend

1. Check `VITE_API_URL` in Vercel env vars
2. Verify backend CORS allows frontend domain
3. Check network tab in browser dev tools
4. Ensure backend is running (health check)

### Database connection failed

1. Verify MongoDB connection string
2. Check database user password
3. Ensure IP whitelist includes Railway IPs
4. Test connection string locally first

### 401 Unauthorized errors

1. Check JWT secrets match between deployments
2. Verify token is being sent in Authorization header
3. Check token hasn't expired
4. Ensure user exists and is active

---

## 🔄 Updating the Application

### Backend Updates

```bash
# Make changes to backend code
cd backend
# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Backend: description of changes"
git push origin main

# Railway auto-deploys
```

### Frontend Updates

```bash
# Make changes to frontend code
cd frontend
# Test locally
npm run dev

# Build to check for errors
npm run build

# Commit and push
git add .
git commit -m "Frontend: description of changes"
git push origin main

# Vercel auto-deploys
```

### Database Migrations

For schema changes:
1. Update models in `backend/src/models/`
2. Test locally with sample data
3. Deploy backend (Railway)
4. If breaking changes, may need to re-seed production DB

---

## 💰 Cost Estimate

### Free Tier (Development/MVP)

- **MongoDB Atlas**: FREE (M0 Sandbox - 512MB storage)
- **Railway**: FREE ($5 credit/month)
- **Vercel**: FREE (Hobby plan)

**Total**: $0/month for small-scale usage

### Production Scale

- **MongoDB Atlas**: 
  - M2: $9/month (2GB storage)
  - M10: $57/month (10GB storage, recommended)
  
- **Railway**:
  - Pay as you go: ~$5-20/month depending on usage
  
- **Vercel**:
  - Free for small projects
  - Pro: $20/month for team features

**Estimated**: $15-100/month depending on scale

---

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables set correctly
- [ ] Strong passwords and secrets used
- [ ] Default admin password changed
- [ ] Database seeded with initial admin
- [ ] CORS properly configured
- [ ] All API endpoints tested
- [ ] Frontend connected to backend
- [ ] Complete user flow tested (submit complaint → admin resolves)
- [ ] Error handling tested
- [ ] Rate limiting verified
- [ ] Monitoring and alerts configured
- [ ] Backup strategy in place
- [ ] SSL/HTTPS enabled (automatic on Railway/Vercel)
- [ ] Documentation updated
- [ ] Team trained on admin panel

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Check error logs, monitor performance
2. **Monthly**: Review database size, optimize queries
3. **Quarterly**: Update dependencies, security patches
4. **Yearly**: Review and optimize infrastructure costs

### Backup Strategy

MongoDB Atlas automatic backups:
- Continuous backups (Point-in-time restore)
- Snapshot backups daily
- Retained for 7 days (free tier)

---

## 🚀 Success!

Your Rail Madad application is now deployed and ready for production use!

**URLs to save**:
- Frontend: `https://rail-madad-ai.vercel.app`
- Backend API: `https://your-backend.up.railway.app`
- API Docs: `https://your-backend.up.railway.app/health`

**Admin Access**:
- Email: admin@railmadad.com
- Password: [Your production password]

---

**Deployment Complete! 🎉**
