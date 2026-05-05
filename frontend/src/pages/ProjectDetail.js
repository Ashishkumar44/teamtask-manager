import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService, taskService } from '../services/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
  });
  const [memberData, setMemberData] = useState({
    userId: '',
    role: 'Member',
  });
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchProjectData = useCallback(async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        projectService.getProject(id, token),
        taskService.getProjectTasks(id, token),
      ]);
      setProject(projectRes.data.project);
      setTasks(tasksRes.data.tasks);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleTaskChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(id, formData, token);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        assignedTo: '',
      });
      setShowTaskForm(false);
      fetchProjectData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId, token);
        fetchProjectData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleMemberChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await projectService.addMember(id, memberData.userId, memberData.role, token);
      setMemberData({ userId: '', role: 'Member' });
      setShowMemberForm(false);
      fetchProjectData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add member');
    }
  };

  const handleRemoveMember = async (userId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await projectService.removeMember(id, userId, token);
        fetchProjectData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to remove member');
      }
    }
  };

  if (loading) return <div className="project-detail-container">Loading...</div>;

  const isOwner = project?.owner._id === user?.id;
  const filteredTasks =
    filterStatus === 'All' ? tasks : tasks.filter((t) => t.status === filterStatus);

  return (
    <div className="project-detail-container">
      <div className="back-button">
        <button onClick={() => navigate('/projects')}>← Back to Projects</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {project && (
        <>
          <div className="project-info">
            <div className="info-header">
              <h1>{project.name}</h1>
              <span className={`status-badge status-${project.status}`}>
                {project.status}
              </span>
            </div>
            {project.description && (
              <p className="description">{project.description}</p>
            )}
            <div className="info-meta">
              <div className="meta-item">
                <span>Owner:</span> {project.owner.name}
              </div>
              <div className="meta-item">
                <span>Members:</span> {project.members.length}
              </div>
              {project.endDate && (
                <div className="meta-item">
                  <span>End Date:</span>{' '}
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <div className="content-grid">
            <div className="tasks-section">
              <div className="section-header">
                <h2>Tasks</h2>
                {isOwner && (
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                  >
                    {showTaskForm ? 'Cancel' : '+ Add Task'}
                  </button>
                )}
              </div>

              {showTaskForm && isOwner && (
                <div className="form-card">
                  <form onSubmit={handleTaskSubmit}>
                    <div className="form-group">
                      <label>Task Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleTaskChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Priority</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleTaskChange}
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Assign To</label>
                        <select
                          name="assignedTo"
                          value={formData.assignedTo}
                          onChange={handleTaskChange}
                        >
                          <option value="">Select Member</option>
                          {project.members.map((member) => (
                            <option key={member.user._id} value={member.user._id}>
                              {member.user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleTaskChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Create Task
                    </button>
                  </form>
                </div>
              )}

              <div className="task-filters">
                {['All', 'To Do', 'In Progress', 'Completed'].map((status) => (
                  <button
                    key={status}
                    className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status} ({tasks.filter((t) => t.status === status || (status === 'All')).length})
                  </button>
                ))}
              </div>

              <div className="tasks-list">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task._id} className="task-card">
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <span className={`status-badge status-${task.status}`}>
                          {task.status}
                        </span>
                      </div>
                      {task.description && (
                        <p className="task-desc">{task.description}</p>
                      )}
                      <div className="task-meta">
                        {task.assignedTo && (
                          <span className="assigned">
                            Assigned: {task.assignedTo.name}
                          </span>
                        )}
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="due-date">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="task-actions">
                        <a href={`/tasks/${task._id}`} className="btn-link">
                          View
                        </a>
                        {isOwner && (
                          <button
                            className="btn-link btn-danger"
                            onClick={() => handleDeleteTask(task._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No tasks in this category</p>
                  </div>
                )}
              </div>
            </div>

            <div className="sidebar">
              <div className="members-section">
                <div className="section-header">
                  <h3>Team Members</h3>
                  {isOwner && (
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => setShowMemberForm(!showMemberForm)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showMemberForm && isOwner && (
                  <div className="form-card">
                    <form onSubmit={handleAddMember}>
                      <div className="form-group">
                        <label>User ID *</label>
                        <input
                          type="text"
                          name="userId"
                          value={memberData.userId}
                          onChange={handleMemberChange}
                          placeholder="Enter user ID"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          name="role"
                          value={memberData.role}
                          onChange={handleMemberChange}
                        >
                          <option>Member</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-success">
                        Add Member
                      </button>
                    </form>
                  </div>
                )}

                <div className="members-list">
                  {project.members.map((member) => (
                    <div key={member.user._id} className="member-item">
                      <div className="member-info">
                        <div className="member-name">{member.user.name}</div>
                        <div className="member-role">{member.role}</div>
                      </div>
                      {isOwner && project.owner._id !== member.user._id && (
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveMember(member.user._id)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
