# Team Task Manager - Installation & Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Database Configuration](#database-configuration)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Verification Checklist](#verification-checklist)

---

## System Requirements

### Minimum Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (included with Node.js)
- **MongoDB**: v4.0 or higher (local or cloud)
- **RAM**: 2GB minimum
- **Storage**: 500MB free space

### Recommended
- **Node.js**: v16.0.0 or higher
- **MongoDB**: v5.0 or higher
- **RAM**: 4GB+
- **OS**: Windows 10, macOS 10.15, Ubuntu 18.04+

---

## Installation Steps

### 1. Install Node.js

**Windows & macOS:**
- Download from https://nodejs.org/ (LTS version)
- Run installer and follow prompts

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Verify installation:**
```bash
node --version
npm --version
```

---

### 2. Install MongoDB

#### Option A: Local Installation

**Windows:**
- Download: https://www.mongodb.com/try/download/community
- Run MSI installer
- Choose "Install MongoDB as a Service"
- Start service from Services app

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y gnupg wget
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database`
5. Use this in `.env` file as `MONGODB_URI`

---

### 3. Clone/Download Project

```bash
# Navigate to your workspace
cd "C:/MYWORK" # or your path

# Project is already in: Team Task Manager folder
# If not, create the folders:
mkdir "Team Task Manager"
cd "Team Task Manager"
```

---

## Database Configuration

### Verify MongoDB Connection

```bash
# Test connection (if local)
mongo
# Should show: > prompt

# Type to exit:
exit
```

### Create Database

```bash
# Optional - MongoDB auto-creates on first write
# Use MongoDB Compass GUI for visual confirmation
# Connection: mongodb://localhost:27017
```

---

## Environment Variables

### Backend `.env` File

Create or update: `backend/.env`

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/team-task-manager

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345

# Environment
NODE_ENV=development
```

### Frontend Configuration

Frontend connects via proxy in `frontend/package.json`:
```json
"proxy": "http://localhost:5000"
```

---

## Running the Application

### Method 1: Two Separate Terminals

**Terminal 1 - Backend:**
```bash
cd "Team Task Manager/backend"
npm install
npm run dev
# Output: Server running on port 5000
```

**Terminal 2 - Frontend (New Terminal):**
```bash
cd "Team Task Manager/frontend"
npm install
npm start
# Output: Compiled successfully!
# Browser opens at http://localhost:3000
```

### Method 2: Using npm Scripts

**From root directory:**

Backend in background (if you're comfortable with it):
```bash
cd backend
npm install
npm run dev &
```

Then frontend:
```bash
cd ../frontend
npm install
npm start
```

---

## Verification Checklist

### ✅ Backend Checks

- [ ] MongoDB running
  ```bash
  # Check if connected
  mongo --eval "db.serverStatus()"
  ```

- [ ] Backend dependencies installed
  ```bash
  cd backend
  npm install
  ```

- [ ] Backend server running
  ```bash
  npm run dev
  # Should see: Server running on port 5000
  ```

- [ ] API accessible
  ```bash
  curl http://localhost:5000/api/health
  # Should return: {"success":true,"message":"Server is running"}
  ```

### ✅ Frontend Checks

- [ ] Frontend dependencies installed
  ```bash
  cd frontend
  npm install
  ```

- [ ] Frontend starts without errors
  ```bash
  npm start
  # Should compile and open browser
  ```

- [ ] Page loads
  - Should see login/signup page
  - URL: http://localhost:3000

### ✅ Integration Tests

- [ ] **Signup**
  ```
  1. Go to http://localhost:3000
  2. Click "Sign up"
  3. Fill form and submit
  4. Should see dashboard
  ```

- [ ] **Create Project**
  ```
  1. Click "Projects"
  2. Click "New Project"
  3. Fill details and submit
  4. Should appear in list
  ```

- [ ] **Create Task**
  ```
  1. Open a project
  2. Click "Add Task"
  3. Fill details and submit
  4. Should appear in task list
  ```

- [ ] **Dashboard Shows Data**
  ```
  1. Go to "Dashboard"
  2. Should show project count
  3. Should show task count
  ```

---

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solutions:**
```bash
# Check if MongoDB is running
ps aux | grep mongod  # Linux/macOS
tasklist | find "mongod"  # Windows

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
# Windows: Use Services app

# Or use MongoDB Atlas instead (cloud)
```

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Change PORT in backend/.env to 5001 (or any free port)
PORT=5001

# Or kill the process using port 5000
lsof -ti:5000 | xargs kill -9  # Linux/macOS
netstat -ano | findstr :5000  # Windows (find PID then taskkill)
```

### npm install Fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Use legacy dependency resolution
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
npm install
```

### CORS Error in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
```bash
# Already configured in backend/src/server.js
# If issue persists:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Try incognito window
```

### Blank Page After Login

**Error:** White page, no content

**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Verify backend is running (http://localhost:5000/api/health)
5. Clear localStorage: `localStorage.clear()`

---

## Performance Optimization

### Development Mode

For faster reloads:

**Backend** - Already using nodemon:
```bash
npm run dev
```

**Frontend** - Already optimized:
```bash
npm start
```

### Production Build

```bash
# Frontend
cd frontend
npm run build
# Creates optimized build in frontend/build folder

# Backend stays as is (Node handles production)
```

---

## Security Notes

⚠️ **Before Deployment:**

1. **Change JWT_SECRET**
   - Generate strong key: https://strongpasswordgenerator.com/
   - Update in `.env`

2. **Use Environment Variables**
   - Never commit `.env` file
   - Use `.env.example` for documentation

3. **Database Security**
   - Use strong MongoDB password
   - Restrict MongoDB access
   - Enable authentication

4. **CORS Configuration**
   - Update for your production domain
   - Edit `backend/src/server.js`

5. **HTTPS**
   - Use SSL/TLS certificates
   - Use reverse proxy (nginx)

---

## Support & Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev
- **MongoDB Docs**: https://docs.mongodb.com/
- **Project README**: See `README.md`

---

## Next Steps

1. ✅ Complete all verification checks
2. ✅ Run test scenarios from QUICKSTART.md
3. ✅ Explore features in the UI
4. ✅ Check code structure
5. 📦 Deploy to production (optional)

---

**Installation Complete! 🎉**

Start building amazing projects with your team! 🚀
