const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const projectId = req.params.projectId;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide task title',
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const isMember = project.members.some((m) => m.user.toString() === req.user.id);
    const isOwner = project.owner.toString() === req.user.id;

    if (!isOwner && !isMember) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create tasks in this project',
      });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || 'Medium',
      dueDate,
      assignedTo,
      project: projectId,
      createdBy: req.user.id,
    });

    await task.populate(['assignedTo', 'createdBy', 'comments.user']);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tasks for a project
exports.getProjectTasks = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const isMember = project.members.some((m) => m.user.toString() === req.user.id);
    const isOwner = project.owner.toString() === req.user.id;

    if (!isOwner && !isMember) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view tasks in this project',
      });
    }

    const tasks = await Task.find({ project: projectId })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single task
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.user', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const project = await Project.findById(task.project);
    const isMember = project.members.some((m) => m.user.toString() === req.user.id);
    const isOwner = project.owner.toString() === req.user.id;

    if (!isOwner && !isMember) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;

    await task.save();
    await task.populate(['assignedTo', 'createdBy', 'comments.user']);

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const project = await Project.findById(task.project);
    const isOwner = project.owner.toString() === req.user.id;

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add comment to task
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    task.comments.push({
      user: req.user.id,
      text,
    });

    await task.save();
    await task.populate(['assignedTo', 'createdBy', 'comments.user']);

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard data
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all projects where user is a member or owner
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
    });

    const projectIds = projects.map((p) => p._id);

    // Get all tasks
    const allTasks = await Task.find({ project: { $in: projectIds } })
      .populate('assignedTo', 'name email')
      .populate('project', 'name');

    // Get tasks assigned to user
    const assignedTasks = allTasks.filter((t) => t.assignedTo?._id.toString() === userId);

    // Get overdue tasks
    const overdueTaskss = allTasks.filter((t) => {
      if (t.dueDate && t.status !== 'Completed') {
        return new Date(t.dueDate) < new Date();
      }
      return false;
    });

    // Get tasks by status
    const tasksByStatus = {
      'To Do': allTasks.filter((t) => t.status === 'To Do').length,
      'In Progress': allTasks.filter((t) => t.status === 'In Progress').length,
      Completed: allTasks.filter((t) => t.status === 'Completed').length,
    };

    res.status(200).json({
      success: true,
      dashboard: {
        totalProjects: projects.length,
        totalTasks: allTasks.length,
        assignedTasks: assignedTasks.length,
        overdueTasks: overdueTaskss.length,
        tasksByStatus,
        recentTasks: allTasks.slice(-5),
        overdueTasksList: overdueTaskss,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
