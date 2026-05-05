# Testing Scenarios & Checklist

## 🧪 Comprehensive Testing Guide

### Before You Start
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ MongoDB running
- ✅ Database is clean (optional, but recommended for fresh test)

---

## 1️⃣ Authentication Testing

### Test 1.1: User Registration
**Steps:**
1. Go to http://localhost:3000
2. Click "Sign up"
3. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "Test@123"
   - Confirm Password: "Test@123"
4. Click "Sign Up"

**Expected:** Redirected to dashboard, user logged in

**Check:**
- [ ] No error message
- [ ] Redirected to /dashboard
- [ ] User name shown in header
- [ ] Token stored in localStorage

---

### Test 1.2: Duplicate Email
**Steps:**
1. Try to signup with same email again
2. Fill form with existing email

**Expected:** Error message "Email already registered"

**Check:**
- [ ] Error displayed
- [ ] Page stays on signup
- [ ] No token generated

---

### Test 1.3: Password Mismatch
**Steps:**
1. Go to signup
2. Enter different passwords in "Password" and "Confirm Password"
3. Click Sign Up

**Expected:** Error message "Passwords do not match"

**Check:**
- [ ] Error displayed
- [ ] Form not submitted

---

### Test 1.4: Login
**Steps:**
1. Logout or open new incognito window
2. Go to http://localhost:3000/login
3. Enter credentials:
   - Email: "test@example.com"
   - Password: "Test@123"
4. Click Login

**Expected:** Redirected to dashboard

**Check:**
- [ ] No error
- [ ] Redirected to /dashboard
- [ ] User info shown in header

---

### Test 1.5: Invalid Credentials
**Steps:**
1. Try login with wrong password
2. Try login with non-existent email

**Expected:** Error message "Invalid credentials"

**Check:**
- [ ] Error displayed both times
- [ ] Not redirected

---

## 2️⃣ Dashboard Testing

### Test 2.1: Dashboard Loads
**Steps:**
1. After login, should be on dashboard
2. Observe the page

**Expected:** Dashboard with stats visible

**Check:**
- [ ] Total Projects: 0
- [ ] Total Tasks: 0
- [ ] Assigned to Me: 0
- [ ] Overdue Tasks: 0
- [ ] Status breakdown visible
- [ ] No errors in console

---

## 3️⃣ Project Management Testing

### Test 3.1: Create Project
**Steps:**
1. Click "Projects" in header
2. Click "+ New Project"
3. Fill form:
   - Project Name: "Q1 Marketing Campaign"
   - Description: "Marketing initiatives for Q1 2024"
   - End Date: "2024-03-31"
4. Click "Create Project"

**Expected:** Project appears in list, card shows on page

**Check:**
- [ ] Form closes
- [ ] Project appears in grid
- [ ] Project name correct
- [ ] Status is "Active"
- [ ] Owner is current user
- [ ] Member count is 1 (you)

---

### Test 3.2: View Project
**Steps:**
1. Click "View" on project card
2. Observe project detail page

**Expected:** Project details displayed

**Check:**
- [ ] Project name shown
- [ ] Description visible
- [ ] Owner info correct
- [ ] Team Members section visible (showing you)
- [ ] Tasks section visible (empty)
- [ ] "Add Task" button visible

---

### Test 3.3: Update Project
**Steps:**
1. On project detail page
2. Note: Edit button shown (you're owner)
3. Change project name to "Q1 Marketing 2024"
4. Click Update (if available)

**Expected:** Project updated

**Check:**
- [ ] Name changed in display
- [ ] Changes persisted (refresh page)

---

### Test 3.4: Create Multiple Projects
**Steps:**
1. Go to Projects
2. Create 3 more projects:
   - "Website Redesign"
   - "Mobile App Development"
   - "Customer Portal"

**Expected:** All projects in list

**Check:**
- [ ] All 4 projects visible
- [ ] Dashboard now shows 4 projects

---

## 4️⃣ Task Management Testing

### Test 4.1: Create Task
**Steps:**
1. Open any project
2. Click "+ Add Task"
3. Fill form:
   - Title: "Design landing page"
   - Description: "Create responsive landing page design"
   - Priority: "High"
   - Assign To: Select yourself
   - Due Date: "2024-02-15"
4. Click "Create Task"

**Expected:** Task appears in task list

**Check:**
- [ ] Task title shown
- [ ] Status is "To Do"
- [ ] Priority shows "High"
- [ ] Due date displayed
- [ ] Assigned to you

---

### Test 4.2: Create Multiple Tasks with Different States
**Steps:**
1. Create 5 more tasks:
   - Task 2: Priority "Medium", Status "To Do"
   - Task 3: Priority "Low", Status "To Do"
   - Task 4: Due date in past, Status "To Do" (for overdue test)
   - Task 5: Status "In Progress"
   - Task 6: Status "Completed"

**Expected:** All tasks visible in appropriate filters

**Check:**
- [ ] All tasks shown
- [ ] Filters work correctly
- [ ] Past due task shows in overdue list

---

### Test 4.3: View Task Detail
**Steps:**
1. Click "View" on any task
2. Observe task detail page

**Expected:** Full task details displayed

**Check:**
- [ ] Title shown
- [ ] Description visible
- [ ] Status, Priority, Due date shown
- [ ] Assigned to info correct
- [ ] Comments section visible (empty)

---

### Test 4.4: Update Task Status
**Steps:**
1. On task detail page
2. Click "Edit"
3. Change status to "In Progress"
4. Click "Save Changes"

**Expected:** Status updated

**Check:**
- [ ] Status changed
- [ ] Reflects in task list
- [ ] Reflects in filters

---

### Test 4.5: Add Comment to Task
**Steps:**
1. On task detail page
2. In Comments section, type: "Started working on this"
3. Click "Post Comment"

**Expected:** Comment appears

**Check:**
- [ ] Comment text shown
- [ ] Your name as author
- [ ] Comment date/time shown
- [ ] Textarea cleared

---

### Test 4.6: Delete Task
**Steps:**
1. On task detail page
2. Scroll down
3. Click "Delete Task"
4. Confirm deletion

**Expected:** Task deleted, redirected back

**Check:**
- [ ] Task removed from list
- [ ] Task count decreased

---

## 5️⃣ Team Management Testing

### Test 5.1: Add Team Member
**Steps:**
1. Open a project you own
2. Go to "Team Members" section
3. Click "+" button
4. Get another user's ID (create new account first):
   - Signup: User 2 (user2@example.com)
   - Copy the user ID from user response
5. In Team Members form:
   - User ID: Paste the ID
   - Role: "Member"
6. Click "Add Member"

**Expected:** Member added to team

**Check:**
- [ ] New member appears in list
- [ ] Role is "Member"
- [ ] Member count increased

---

### Test 5.2: Assign Task to Different Member
**Steps:**
1. Create new task in project
2. Assign To: Select the team member you added
3. Create task

**Expected:** Task assigned to other member

**Check:**
- [ ] Task shows assigned member name
- [ ] Other member can see task (when they login)

---

### Test 5.3: Remove Team Member
**Steps:**
1. In Team Members section
2. Click "✕" button on member

**Expected:** Member removed

**Check:**
- [ ] Member removed from list
- [ ] Member count decreased

---

## 6️⃣ Dashboard Statistics Testing

### Test 6.1: Dashboard Reflects Changes
**Steps:**
1. Go to Dashboard
2. Check statistics

**Expected:** Stats updated with all created items

**Check:**
- [ ] Total Projects: 4
- [ ] Total Tasks: 6 (or however many you created)
- [ ] Assigned to Me: Shows your tasks
- [ ] Overdue Tasks: Shows past due tasks
- [ ] Status breakdown: Accurate counts
- [ ] Recent Tasks: Shows latest 5
- [ ] Overdue Tasks list: Shows task details

---

## 7️⃣ Filtering & Search Testing

### Test 7.1: Task Status Filters
**Steps:**
1. Open project with multiple tasks
2. Click filter buttons: "All", "To Do", "In Progress", "Completed"

**Expected:** Tasks filtered correctly

**Check:**
- [ ] "All" shows all tasks
- [ ] "To Do" shows only To Do tasks
- [ ] "In Progress" shows only In Progress
- [ ] "Completed" shows only Completed
- [ ] Count badges accurate

---

## 8️⃣ Error Handling Testing

### Test 8.1: Network Error
**Steps:**
1. Stop backend server
2. Try any action (create project, task, etc.)

**Expected:** Error message displayed

**Check:**
- [ ] Clear error message
- [ ] Page doesn't break
- [ ] User can still navigate

---

### Test 8.2: Validation Errors
**Steps:**
1. Try to create project without name
2. Try to create task without title

**Expected:** Validation error shown

**Check:**
- [ ] Error message displayed
- [ ] Form not submitted

---

## 9️⃣ Permission Testing

### Test 9.1: Non-Owner Cannot Delete Project
**Steps:**
1. Login as User 2 (member, not owner)
2. View a project you're member of (but not owner)

**Expected:** No delete button shown

**Check:**
- [ ] Only "View" button available
- [ ] Delete button missing

---

### Test 9.2: Non-Owner Cannot Add Members
**Steps:**
1. As member (not owner) on project
2. Look for add member button

**Expected:** No add member button

**Check:**
- [ ] "+" button not visible for members
- [ ] Can still see team members

---

## 🔟 Performance Testing

### Test 10.1: Multiple Projects Load
**Steps:**
1. Create 10+ projects
2. Go to Projects page
3. Measure load time

**Expected:** Page loads smoothly

**Check:**
- [ ] Page loads in < 3 seconds
- [ ] Scroll smoothly
- [ ] No lag when interacting

---

### Test 10.2: Multiple Tasks Load
**Steps:**
1. Create project with 20+ tasks
2. Go to project detail
3. Load task list

**Expected:** Tasks load and display

**Check:**
- [ ] All tasks visible
- [ ] Filters work
- [ ] No performance issues

---

## ✅ Final Verification Checklist

**Core Features:**
- [ ] Authentication works (signup, login, logout)
- [ ] Projects can be created, viewed, updated, deleted
- [ ] Tasks can be created, viewed, updated, deleted
- [ ] Team members can be added and removed
- [ ] Comments can be added to tasks
- [ ] Dashboard shows correct statistics
- [ ] Task filters work correctly
- [ ] Permissions enforced (owner vs member)

**UI/UX:**
- [ ] All pages load without errors
- [ ] Forms validate input
- [ ] Error messages clear
- [ ] Navigation works
- [ ] Header shows user info
- [ ] Logout works
- [ ] Styling consistent
- [ ] Mobile responsive (optional)

**Data Integrity:**
- [ ] Data persists after refresh
- [ ] Database updates correctly
- [ ] Relationships maintained (project→tasks)
- [ ] User isolation (users see only their projects)

**Performance:**
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth interactions

---

## 🐛 Bug Reporting Template

If you find an issue:

```
Title: [Brief description]

Environment:
- Browser: Chrome/Firefox/Safari
- OS: Windows/macOS/Linux
- Version: 1.0.0

Steps to Reproduce:
1. ...
2. ...
3. ...

Expected Behavior:
...

Actual Behavior:
...

Screenshots:
[Attach if possible]

Console Errors:
[Check F12 > Console]
```

---

**Testing Complete!** 🎉

All features tested and working? Great! Ready for deployment or further development.
