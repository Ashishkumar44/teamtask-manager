# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB (local or cloud)

### Step 1: Start MongoDB

**Local MongoDB:**
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows
# Run mongod.exe from your MongoDB installation directory

# Docker (if you have Docker)
docker run -d -p 27017:27017 --name mongodb mongo
```

Or use **MongoDB Atlas** (cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Backend Setup

```bash
cd "Team Task Manager/backend"
npm install

# Edit .env file:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/team-task-manager
# JWT_SECRET=your-secret-key-12345

npm run dev
# Server starts on http://localhost:5000
```

### Step 3: Frontend Setup (New Terminal)

```bash
cd "Team Task Manager/frontend"
npm install
npm start
# App opens at http://localhost:3000
```

### Step 4: Test the App

1. **Sign Up**: Register a new account
2. **Create Project**: Click "New Project"
3. **Add Tasks**: Open the project and create tasks
4. **Assign Members**: Add team members to project
5. **Track Progress**: View dashboard for overview

---

## 📝 Test Scenarios

### Scenario 1: Basic Project Management
1. Login with test account
2. Create project "Q1 Marketing"
3. Add description and end date
4. View on dashboard
5. Edit and delete project

### Scenario 2: Team Collaboration
1. Create project "Website Redesign"
2. Add 2-3 team members (use their user IDs)
3. Create multiple tasks
4. Assign tasks to different members
5. Each member can view and update their tasks

### Scenario 3: Task Tracking
1. Create project with tasks
2. Create tasks with different priorities (Low, Medium, High)
3. Set due dates (some in past = overdue)
4. Update task statuses
5. View dashboard - check overdue tasks highlighted
6. Add comments to tasks
7. Mark tasks as completed

### Scenario 4: Role-Based Access
1. Project owner: Full control (create, edit, delete tasks)
2. Admin member: Can create and manage tasks
3. Regular member: Can view and update assigned tasks
4. Non-member: Cannot access project

---

## 🔧 API Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My Project",
    "description": "Project description",
    "endDate": "2024-12-31"
  }'
```

---

## 📊 Database Queries (MongoDB)

### Connect to MongoDB
```bash
# Local
mongo

# Or in MongoDB Compass GUI
mongodb://localhost:27017/team-task-manager
```

### Useful Queries
```javascript
// View all users
db.users.find()

// View all projects
db.projects.find()

// View project with members
db.projects.findOne({_id: ObjectId("...")}, {members: 1})

// Count tasks by status
db.tasks.aggregate([
  {$group: {_id: "$status", count: {$sum: 1}}}
])

// Find overdue tasks
db.tasks.find({
  dueDate: {$lt: new Date()},
  status: {$ne: "Completed"}
})
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `Cannot connect to MongoDB` | Ensure MongoDB is running or check connection string in .env |
| `CORS Error` | Backend and frontend are on different origins - should work with proxy in frontend package.json |
| `Login fails with 401` | Clear browser cache, check token in localStorage |
| `Token expired` | Re-login to get new token (expires in 7 days) |
| `Port 5000/3000 in use` | Change PORT in .env or .env var |
| `Blank page after login` | Check browser console for errors, verify API is running |

---

## 📚 API Response Examples

### Success Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Admin"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 🎯 Next Steps

1. ✅ Run backend and frontend
2. ✅ Create test account
3. ✅ Create sample project
4. ✅ Add team members
5. ✅ Create and assign tasks
6. ✅ Test all features
7. 📦 Deploy to production (Heroku, Vercel, AWS)

---

Happy coding! 🎉
