# Team Task Manager - File Directory & Index

## 📂 Complete Project Structure

```
Team Task Manager/
│
├── 📄 README.md                    ← START HERE (Main documentation)
├── 📄 PROJECT_SUMMARY.md           ← Project overview & features
├── 📄 QUICKSTART.md                ← 5-minute setup guide
├── 📄 SETUP.md                     ← Detailed setup instructions
├── 📄 API_DOCS.md                  ← Complete API reference
├── 📄 TESTING.md                   ← Testing scenarios
├── 📄 FILE_STRUCTURE.md            ← This file
│
├── 📁 backend/                     (Node.js/Express REST API)
│   │
│   ├── 📄 package.json             ← Backend dependencies
│   ├── 📄 .env                     ← Environment variables (UPDATE THIS)
│   ├── 📄 .env.example             ← Example env file
│   ├── 📄 .gitignore
│   │
│   └── 📁 src/
│       ├── 📄 server.js            ← Main Express server
│       │
│       ├── 📁 config/
│       │   └── 📄 db.js            ← MongoDB connection
│       │
│       ├── 📁 models/              (Database schemas)
│       │   ├── 📄 User.js          ← User model (with password hashing)
│       │   ├── 📄 Project.js       ← Project model (with members)
│       │   └── 📄 Task.js          ← Task model (with comments)
│       │
│       ├── 📁 controllers/         (Business logic)
│       │   ├── 📄 authController.js    ← Signup, login, auth logic
│       │   ├── 📄 projectController.js ← Project CRUD operations
│       │   └── 📄 taskController.js    ← Task CRUD & dashboard logic
│       │
│       ├── 📁 routes/              (API endpoints)
│       │   ├── 📄 authRoutes.js        ← /api/auth endpoints
│       │   ├── 📄 projectRoutes.js     ← /api/projects endpoints
│       │   └── 📄 taskRoutes.js        ← /api/tasks endpoints
│       │
│       └── 📁 middleware/          (Middleware functions)
│           ├── 📄 auth.js          ← JWT verification & authorization
│           └── 📄 errorHandler.js  ← Global error handling
│
└── 📁 frontend/                    (React SPA)
    │
    ├── 📄 package.json             ← Frontend dependencies
    ├── 📄 .gitignore
    │
    ├── 📁 public/
    │   └── 📄 index.html           ← HTML template
    │
    └── 📁 src/
        │
        ├── 📄 App.js               ← Main app component with routing
        ├── 📄 App.css              ← Global app styles
        ├── 📄 index.js             ← React entry point
        ├── 📄 index.css            ← Global CSS
        │
        ├── 📁 components/          (Reusable components)
        │   └── 📄 Header.js        ← Navigation header
        │
        ├── 📁 context/             (Global state)
        │   └── 📄 AuthContext.js   ← Authentication state management
        │
        ├── 📁 services/            (API calls)
        │   └── 📄 api.js           ← API service methods
        │
        └── 📁 pages/               (Page components)
            ├── 📄 Login.js         ← Login page
            ├── 📄 Login.css        ← Login styles
            ├── 📄 Signup.js        ← Signup page
            ├── 📄 Auth.css         ← Auth component styles
            ├── 📄 Dashboard.js     ← Dashboard with stats
            ├── 📄 Dashboard.css    ← Dashboard styles
            ├── 📄 Projects.js      ← Projects list
            ├── 📄 Projects.css     ← Projects styles
            ├── 📄 ProjectDetail.js ← Project detail & tasks
            ├── 📄 ProjectDetail.css ← Project detail styles
            ├── 📄 TaskDetail.js    ← Task detail page
            └── 📄 TaskDetail.css   ← Task detail styles
```

---

## 🗂️ File Descriptions

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | **START HERE** - Main project documentation with all features |
| `PROJECT_SUMMARY.md` | Complete project overview, tech stack, and features |
| `QUICKSTART.md` | 5-minute setup guide with test scenarios |
| `SETUP.md` | Detailed installation instructions with troubleshooting |
| `API_DOCS.md` | Complete REST API reference with examples |
| `TESTING.md` | 40+ test scenarios and testing checklist |
| `FILE_STRUCTURE.md` | This file - complete file directory |

### Backend Files

#### Server Setup
- `backend/src/server.js` - Main Express application
- `backend/src/config/db.js` - MongoDB connection

#### Models (Database Schemas)
- `backend/src/models/User.js` - User schema with password hashing
- `backend/src/models/Project.js` - Project schema with members array
- `backend/src/models/Task.js` - Task schema with comments array

#### Controllers (Business Logic)
- `backend/src/controllers/authController.js` - Authentication logic (signup, login)
- `backend/src/controllers/projectController.js` - Project management operations
- `backend/src/controllers/taskController.js` - Task management & dashboard stats

#### Routes (API Endpoints)
- `backend/src/routes/authRoutes.js` - `/api/auth/*` endpoints
- `backend/src/routes/projectRoutes.js` - `/api/projects/*` endpoints
- `backend/src/routes/taskRoutes.js` - `/api/tasks/*` endpoints

#### Middleware
- `backend/src/middleware/auth.js` - JWT verification & authorization
- `backend/src/middleware/errorHandler.js` - Global error handling

#### Configuration
- `backend/package.json` - Backend dependencies & scripts
- `backend/.env` - Environment variables (MUST BE CONFIGURED)
- `backend/.env.example` - Example environment file

### Frontend Files

#### Core Application
- `frontend/src/App.js` - Main React component with routing
- `frontend/src/index.js` - React entry point
- `frontend/public/index.html` - HTML template

#### Global State Management
- `frontend/src/context/AuthContext.js` - Authentication context with login/signup/logout

#### API Communication
- `frontend/src/services/api.js` - Axios API methods for all endpoints

#### Page Components
- `frontend/src/pages/Login.js` - Login page with form
- `frontend/src/pages/Signup.js` - Signup page with form
- `frontend/src/pages/Dashboard.js` - Dashboard with statistics
- `frontend/src/pages/Projects.js` - Projects list and creation
- `frontend/src/pages/ProjectDetail.js` - Project detail with tasks
- `frontend/src/pages/TaskDetail.js` - Task detail with comments

#### Navigation
- `frontend/src/components/Header.js` - Header with navigation

#### Styling
- `frontend/src/App.css` - Global app styles
- `frontend/src/pages/Auth.css` - Login/Signup styles
- `frontend/src/pages/Dashboard.css` - Dashboard styles
- `frontend/src/pages/Projects.css` - Projects page styles
- `frontend/src/pages/ProjectDetail.css` - Project detail styles
- `frontend/src/pages/TaskDetail.css` - Task detail styles

#### Configuration
- `frontend/package.json` - Frontend dependencies & scripts

---

## 🔄 How Files Work Together

### Authentication Flow
1. User enters credentials on `Login.js` or `Signup.js`
2. Component calls `AuthContext.js` methods
3. `api.js` sends request to `backend/src/routes/authRoutes.js`
4. `authController.js` handles signup/login logic
5. JWT token stored in localStorage
6. User redirected to Dashboard

### Project Creation Flow
1. User clicks "New Project" on `Projects.js`
2. Form submitted to `api.js` (`projectService.createProject`)
3. Backend `projectRoutes.js` receives POST request
4. `projectController.createProject` processes request
5. `Project.js` model saves to MongoDB
6. Response sent back, UI updated

### Task Management Flow
1. User on `ProjectDetail.js` creates task
2. `api.js` sends to `taskRoutes.js`
3. `taskController.createTask` validates and saves
4. `Task.js` model links to Project
5. Task appears in filtered list
6. Can view details on `TaskDetail.js`

### Dashboard Data Flow
1. `Dashboard.js` component mounts
2. Calls `taskService.getDashboard()`
3. Backend `taskController.getDashboard` aggregates data
4. Queries all user projects and tasks
5. Returns statistics and recent tasks
6. Dashboard displays data

---

## 📝 Important Configuration Files

### Backend Configuration
- `backend/.env` - **YOU MUST UPDATE THIS**
  - Set MongoDB URI
  - Set JWT secret
  - Set PORT (default 5000)

- `backend/package.json` - Dependencies list
  - Run `npm install` to install all

### Frontend Configuration
- `frontend/package.json` - Dependencies
  - `"proxy": "http://localhost:5000"` - Backend API URL
  - Run `npm install` to install all

---

## 🚀 How to Get Started

1. **Read**: Start with `README.md`
2. **Setup**: Follow `SETUP.md` for installation
3. **Quick Run**: Use `QUICKSTART.md` to run in 5 minutes
4. **Test**: Follow `TESTING.md` for testing scenarios
5. **API**: Reference `API_DOCS.md` for API calls
6. **Code**: Explore the source files in `src/` directories

---

## 📊 Lines of Code

- **Backend**: ~1000 lines
- **Frontend**: ~1500 lines
- **Documentation**: ~2500 lines
- **Total**: ~5000+ lines of code and documentation

---

## 🔒 Security Files

Key security implementations:
- `backend/src/models/User.js` - Password hashing
- `backend/src/middleware/auth.js` - JWT verification
- `frontend/src/context/AuthContext.js` - Token management
- `backend/.env` - Sensitive configuration

---

## 📦 Dependencies Summary

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT auth
- **bcryptjs** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-router-dom** - Client routing
- **axios** - HTTP client
- **react-scripts** - Build tools

---

## ✅ What to Do Now

1. ✅ Read `README.md` (main documentation)
2. ✅ Follow `SETUP.md` to install dependencies
3. ✅ Configure `backend/.env` with your MongoDB URI
4. ✅ Run `npm install` in both backend and frontend
5. ✅ Start backend: `npm run dev` (in backend folder)
6. ✅ Start frontend: `npm start` (in frontend folder)
7. ✅ Signup and start using the app!

---

## 🎯 File Quick Reference

**Need to...**
- Understand project? → Read `README.md`
- Setup quickly? → Read `QUICKSTART.md`
- Setup properly? → Read `SETUP.md`
- Check API? → Read `API_DOCS.md`
- Test features? → Read `TESTING.md`
- Modify authentication? → Edit `backend/src/controllers/authController.js`
- Add new project feature? → Modify `ProjectDetail.js` and `projectController.js`
- Change styling? → Edit `.css` files
- Add API endpoint? → Add to routes, controller, and frontend service

---

**Everything is organized, documented, and ready to use!** 🎉

Start with `README.md` and follow the setup guide. You'll be running in minutes!
