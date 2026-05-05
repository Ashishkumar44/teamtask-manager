# Team Task Manager

A full-stack web application for team project and task management with role-based access control (Admin/Member).

## Features

✅ **User Authentication** - Sign up and login with JWT tokens
✅ **Project Management** - Create, view, update, and delete projects
✅ **Task Management** - Create, assign, and track tasks with status and priority
✅ **Team Collaboration** - Add/remove team members to projects with role management
✅ **Dashboard** - Overview of projects, tasks, and deadlines
✅ **Task Tracking** - Status tracking (To Do, In Progress, Completed)
✅ **Comments System** - Add comments to tasks for collaboration
✅ **Overdue Tracking** - Monitor and highlight overdue tasks
✅ **Role-Based Access** - Admin and Member roles with different permissions

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
Team Task Manager/
├── backend/
│   ├── src/
│   │   ├── models/         # Database schemas (User, Project, Task)
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth and error middleware
│   │   ├── config/         # Database configuration
│   │   └── server.js       # Express app entry point
│   ├── package.json
│   ├── .env               # Environment variables
│   └── .gitignore
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # Auth context
    │   ├── services/       # API service calls
    │   ├── App.js          # Main component
    │   ├── index.js        # React entry point
    │   └── index.css       # Global styles
    ├── public/
    ├── package.json
    └── .gitignore
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd "Team Task Manager/backend"

# Install dependencies
npm install

# Create/Update .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/team-task-manager
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Start the backend server
npm start
# For development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd "Team Task Manager/frontend"

# Install dependencies
npm install

# Start the frontend development server
npm start
```

Frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project
- `DELETE /api/projects/:id/members` - Remove member from project

### Tasks
- `POST /api/tasks/project/:projectId` - Create task
- `GET /api/tasks/project/:projectId` - Get project tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment to task
- `GET /api/tasks/dashboard/overview` - Get dashboard data

## How to Use

### 1. Register and Login
- Go to `http://localhost:3000`
- Click "Sign up" and create a new account
- Login with your credentials

### 2. Create a Project
- Navigate to "Projects" page
- Click "New Project" button
- Fill in project details and submit
- You'll be the project owner

### 3. Manage Team Members
- Open a project you own
- Go to "Team Members" section
- Add members by their user ID
- Assign roles (Admin/Member)

### 4. Create and Track Tasks
- Open a project
- Click "Add Task" button
- Fill in task details (title, description, priority, due date)
- Assign to a team member
- Update task status (To Do → In Progress → Completed)

### 5. View Dashboard
- Dashboard shows:
  - Total projects and tasks
  - Tasks assigned to you
  - Overdue tasks
  - Task status breakdown
  - Recent tasks

### 6. Collaborate with Comments
- Open any task
- Add comments for team communication
- See all comments from team members

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Admin/Member),
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (User),
  members: [{ user: ObjectId, role: String }],
  status: String (Active/Inactive/Completed),
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String,
  description: String,
  project: ObjectId (Project),
  assignedTo: ObjectId (User),
  status: String (To Do/In Progress/Completed),
  priority: String (Low/Medium/High),
  dueDate: Date,
  createdBy: ObjectId (User),
  comments: [{ user: ObjectId, text: String, createdAt: Date }],
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication & Authorization

- **JWT Token** - Issued on login, valid for 7 days
- **Protected Routes** - Backend APIs require valid token in header: `Authorization: Bearer <token>`
- **Role-Based Access**:
  - **Admin**: Can create projects, add/remove members, create/update/delete tasks
  - **Member**: Can view projects, create/update tasks assigned to them
  - **Project Owner**: Full control over their projects

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT authentication with 7-day expiration
- Role-based access control
- Input validation
- CORS enabled
- Protected API endpoints

## Future Enhancements

- [ ] Task attachments
- [ ] Email notifications
- [ ] Task templates
- [ ] Kanban board view
- [ ] Team analytics
- [ ] File upload
- [ ] Real-time updates with WebSockets
- [ ] Mobile app

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check MongoDB Atlas credentials
- Update `MONGODB_URI` in `.env`

### CORS Error
- Backend CORS is configured to accept requests from localhost:3000
- If using different port, update CORS in `server.js`

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Run `PORT=3001 npm start`

### Authentication Failed
- Clear browser cache and localStorage
- Check JWT_SECRET matches in `.env`
- Verify token hasn't expired

## Support & Contact

For issues or questions, please create an issue in the repository.

## License

MIT License - Feel free to use this project for personal and commercial purposes.

---

Built with ❤️ for team collaboration and productivity!
