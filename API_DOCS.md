# Team Task Manager - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Sign Up
Create a new user account.

**POST** `/auth/signup`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Member"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. Login
Authenticate user and get JWT token.

**POST** `/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Member"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User
Get authenticated user details.

**GET** `/auth/me` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Admin"
  }
}
```

---

## 📁 Project Endpoints

### 1. Create Project
Create a new project.

**POST** `/projects` ✅ Protected

**Request:**
```json
{
  "name": "Website Redesign",
  "description": "Complete redesign of company website",
  "endDate": "2024-12-31"
}
```

**Response (201):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "members": [
      {
        "user": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "role": "Admin"
      }
    ],
    "status": "Active",
    "startDate": "2024-01-15T10:30:00Z",
    "endDate": "2024-12-31T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Projects
Get all projects for current user.

**GET** `/projects` ✅ Protected

**Query Parameters:**
- None

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Website Redesign",
      "description": "...",
      "status": "Active",
      "owner": { "name": "John Doe", "email": "john@example.com" },
      "members": [...]
    }
  ]
}
```

---

### 3. Get Single Project
Get project details.

**GET** `/projects/:id` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign",
    "description": "...",
    "owner": {...},
    "members": [...],
    "status": "Active",
    "startDate": "...",
    "endDate": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 4. Update Project
Update project details. (Owner only)

**PUT** `/projects/:id` ✅ Protected

**Request:**
```json
{
  "name": "Updated Project Name",
  "description": "New description",
  "status": "Inactive",
  "endDate": "2025-06-30"
}
```

**Response (200):**
```json
{
  "success": true,
  "project": { ... }
}
```

---

### 5. Delete Project
Delete project and all associated tasks. (Owner only)

**DELETE** `/projects/:id` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### 6. Add Member to Project
Add user to project team. (Owner only)

**POST** `/projects/:id/members` ✅ Protected

**Request:**
```json
{
  "userId": "507f1f77bcf86cd799439013",
  "role": "Member"
}
```

**Response (200):**
```json
{
  "success": true,
  "project": { ... }
}
```

---

### 7. Remove Member from Project
Remove user from project team. (Owner only)

**DELETE** `/projects/:id/members` ✅ Protected

**Request:**
```json
{
  "userId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "success": true,
  "project": { ... }
}
```

---

## ✅ Task Endpoints

### 1. Create Task
Create a new task in project.

**POST** `/tasks/project/:projectId` ✅ Protected

**Request:**
```json
{
  "title": "Design Homepage",
  "description": "Create mockups and designs for homepage",
  "priority": "High",
  "dueDate": "2024-02-15",
  "assignedTo": "507f1f77bcf86cd799439013"
}
```

**Response (201):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design Homepage",
    "description": "...",
    "project": "507f1f77bcf86cd799439011",
    "status": "To Do",
    "priority": "High",
    "dueDate": "2024-02-15T00:00:00Z",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "comments": [],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get Project Tasks
Get all tasks in a project.

**GET** `/tasks/project/:projectId` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Design Homepage",
      "status": "In Progress",
      "priority": "High",
      "assignedTo": { ... },
      "dueDate": "2024-02-15T00:00:00Z"
    }
  ]
}
```

---

### 3. Get Single Task
Get task details.

**GET** `/tasks/:id` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design Homepage",
    "description": "...",
    "status": "In Progress",
    "priority": "High",
    "assignedTo": { ... },
    "createdBy": { ... },
    "comments": [
      {
        "user": { "name": "John Doe", "email": "john@example.com" },
        "text": "Great progress!",
        "createdAt": "2024-01-16T10:30:00Z"
      }
    ],
    "dueDate": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 4. Update Task
Update task details.

**PUT** `/tasks/:id` ✅ Protected

**Request:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2024-02-20",
  "assignedTo": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "success": true,
  "task": { ... }
}
```

---

### 5. Delete Task
Delete a task. (Project owner only)

**DELETE** `/tasks/:id` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### 6. Add Comment to Task
Add comment to task.

**POST** `/tasks/:id/comments` ✅ Protected

**Request:**
```json
{
  "text": "This looks great! Let me review it."
}
```

**Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design Homepage",
    "comments": [
      {
        "user": { "name": "John Doe", "email": "john@example.com" },
        "text": "This looks great! Let me review it.",
        "createdAt": "2024-01-16T14:30:00Z"
      }
    ]
  }
}
```

---

### 7. Get Dashboard Overview
Get dashboard statistics and data.

**GET** `/tasks/dashboard/overview` ✅ Protected

**Response (200):**
```json
{
  "success": true,
  "dashboard": {
    "totalProjects": 5,
    "totalTasks": 23,
    "assignedTasks": 8,
    "overdueTasks": 2,
    "tasksByStatus": {
      "To Do": 10,
      "In Progress": 8,
      "Completed": 5
    },
    "recentTasks": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "title": "Design Homepage",
        "status": "In Progress",
        "project": { "name": "Website Redesign" },
        "assignedTo": { "name": "Jane Smith" }
      }
    ],
    "overdueTasksList": [
      {
        "_id": "507f1f77bcf86cd799439021",
        "title": "Fix bugs",
        "status": "To Do",
        "priority": "High",
        "dueDate": "2024-01-10T00:00:00Z",
        "project": { "name": "Website Redesign" }
      }
    ]
  }
}
```

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Database error |

---

## Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authorization Rules

### Public Endpoints
- `/auth/signup` - Anyone
- `/auth/login` - Anyone

### Protected Endpoints (Require Token)
- All `/projects` endpoints
- All `/tasks` endpoints
- `/auth/me`

### Additional Restrictions

**Project Operations:**
- Only project **owner** can:
  - Update project
  - Delete project
  - Add/remove members

- **Members** can:
  - View project
  - View tasks
  - Create tasks
  - Update assigned tasks

**Task Operations:**
- Only **project members** can:
  - View tasks
  - Create tasks
  - Add comments

- **Project owner** can:
  - Delete any task
  - Update any task

---

## Rate Limiting
Currently no rate limiting. For production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination
Currently not implemented. For large datasets, add:
- `?page=1&limit=20` query parameters
- Return `totalCount` and `totalPages`

---

## Testing with Postman

1. Import API to Postman
2. Create environment variables:
   ```
   base_url = http://localhost:5000/api
   token = <jwt_token_from_login>
   projectId = <project_id>
   ```
3. Use `{{base_url}}`, `{{token}}` in requests
4. Auto-set token from login response

---

**API Documentation Complete!** 📖
