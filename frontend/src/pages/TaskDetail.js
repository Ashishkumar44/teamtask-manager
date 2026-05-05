import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
  });

  const fetchTask = useCallback(async () => {
    try {
      const response = await taskService.getTask(id, token);
      setTask(response.data.task);
      setFormData({
        title: response.data.task.title,
        description: response.data.task.description || '',
        status: response.data.task.status,
        priority: response.data.task.priority,
        dueDate: response.data.task.dueDate
          ? new Date(response.data.task.dueDate).toISOString().split('T')[0]
          : '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load task');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await taskService.updateTask(id, formData, token);
      setEditMode(false);
      fetchTask();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await taskService.addComment(id, commentText, token);
      setCommentText('');
      fetchTask();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id, token);
        navigate(-1);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  if (loading) return <div className="task-detail-container">Loading...</div>;

  const isOverdue =
    task?.dueDate && task?.status !== 'Completed' && new Date(task.dueDate) < new Date();

  return (
    <div className="task-detail-container">
      <div className="back-button">
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {task && (
        <>
          {!editMode && (
            <div className="task-view">
              <div className="view-header">
                <div>
                  <h1>{task.title}</h1>
                  {isOverdue && <div className="overdue-badge">⚠️ Overdue</div>}
                </div>
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  Edit
                </button>
              </div>

              {task.description && (
                <div className="section">
                  <h3>Description</h3>
                  <p>{task.description}</p>
                </div>
              )}

              <div className="section">
                <h3>Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Priority:</span>
                    <span className={`priority priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Assigned To:</span>
                    <span>{task.assignedTo ? task.assignedTo.name : 'Unassigned'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Created By:</span>
                    <span>{task.createdBy.name}</span>
                  </div>
                  {task.dueDate && (
                    <div className="detail-item">
                      <span className="label">Due Date:</span>
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="label">Created:</span>
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="section comments-section">
                <h3>Comments</h3>
                <form onSubmit={handleAddComment} className="comment-form">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                  ></textarea>
                  <button type="submit" className="btn btn-success">
                    Post Comment
                  </button>
                </form>

                <div className="comments-list">
                  {task.comments.length > 0 ? (
                    task.comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <div className="comment-header">
                          <span className="comment-author">{comment.user.name}</span>
                          <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString()}{' '}
                            {new Date(comment.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-comments">No comments yet</p>
                  )}
                </div>
              </div>

              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Task
              </button>
            </div>
          )}

          {editMode && (
            <div className="task-edit">
              <h2>Edit Task</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-group">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskDetail;
