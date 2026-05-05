const Project = require('../models/Project');
const Task = require('../models/Task');

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, endDate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide project name',
      });
    }

    const project = await Project.create({
      name,
      description,
      endDate,
      owner: req.user.id,
      members: [
        {
          user: req.user.id,
          role: 'Admin',
        },
      ],
    });

    await project.populate(['owner', 'members.user']);

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all projects for the user
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { 'members.user': req.user.id }],
    })
      .populate('owner', 'name email')
      .populate('members.user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single project
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members.user', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update project
exports.updateProject = async (req, res, next) => {
  try {
    const { name, description, status, endDate } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project',
      });
    }

    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;
    if (endDate) project.endDate = endDate;

    await project.save();
    await project.populate(['owner', 'members.user']);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete project
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project',
      });
    }

    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add member to project
exports.addMember = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only project owner can add members',
      });
    }

    const memberExists = project.members.some((m) => m.user.toString() === userId);

    if (memberExists) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member',
      });
    }

    project.members.push({
      user: userId,
      role: role || 'Member',
    });

    await project.save();
    await project.populate(['owner', 'members.user']);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove member from project
exports.removeMember = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only project owner can remove members',
      });
    }

    project.members = project.members.filter((m) => m.user.toString() !== userId);

    await project.save();
    await project.populate(['owner', 'members.user']);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
