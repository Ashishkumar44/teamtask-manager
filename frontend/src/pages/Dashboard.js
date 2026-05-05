import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await taskService.getDashboard(token);
      setDashboard(response.data.dashboard);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) return <div className="dashboard-container">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {dashboard && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{dashboard.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{dashboard.totalTasks}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{dashboard.assignedTasks}</div>
              <div className="stat-label">Assigned to Me</div>
            </div>
            <div className="stat-card urgent">
              <div className="stat-number">{dashboard.overdueTasks}</div>
              <div className="stat-label">Overdue Tasks</div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="section">
              <h2>Tasks by Status</h2>
              <div className="status-breakdown">
                <div className="status-item">
                  <span className="status-label">To Do</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill todo"
                      style={{
                        width: `${
                          (dashboard.tasksByStatus['To Do'] /
                            dashboard.totalTasks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="status-count">
                    {dashboard.tasksByStatus['To Do']}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">In Progress</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill in-progress"
                      style={{
                        width: `${
                          (dashboard.tasksByStatus['In Progress'] /
                            dashboard.totalTasks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="status-count">
                    {dashboard.tasksByStatus['In Progress']}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Completed</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill completed"
                      style={{
                        width: `${
                          (dashboard.tasksByStatus.Completed /
                            dashboard.totalTasks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="status-count">
                    {dashboard.tasksByStatus.Completed}
                  </span>
                </div>
              </div>
            </div>

            {dashboard.overdueTasks > 0 && (
              <div className="section urgent-section">
                <h2>⚠️ Overdue Tasks ({dashboard.overdueTasks})</h2>
                <div className="tasks-list">
                  {dashboard.overdueTasksList.slice(0, 5).map((task) => (
                    <div key={task._id} className="task-item overdue">
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span className="task-project">{task.project.name}</span>
                        <span className="task-priority">{task.priority}</span>
                        <span className="task-due">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="section">
              <h2>Recent Tasks</h2>
              <div className="tasks-list">
                {dashboard.recentTasks.map((task) => (
                  <div key={task._id} className="task-item">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span className={`status-badge status-${task.status}`}>
                        {task.status}
                      </span>
                      <span className="task-project">{task.project.name}</span>
                      {task.dueDate && (
                        <span className="task-due">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
