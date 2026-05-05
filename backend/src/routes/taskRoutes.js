const express = require('express');
const router = express.Router();
const {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
  addComment,
  getDashboard,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/project/:projectId', createTask);
router.get('/project/:projectId', getProjectTasks);
router.get('/dashboard/overview', getDashboard);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/comments', addComment);

module.exports = router;
