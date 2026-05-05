const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

exports.authorizeProjectMember = async (req, res, next) => {
  try {
    const Project = require('../models/Project');
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = project.members.some((member) => member.user.toString() === req.user.id);
    const isOwner = project.owner.toString() === req.user.id;

    if (!isOwner && !isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this project' });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
