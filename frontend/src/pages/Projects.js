import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/api';
import './Projects.css';

const Projects = () => {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endDate: '',
  });

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects(token);
      setProjects(response.data.projects);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectService.createProject(
        formData.name,
        formData.description,
        formData.endDate,
        token
      );
      setFormData({ name: '', description: '', endDate: '' });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id, token);
        fetchProjects();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  if (loading) return <div className="projects-container">Loading...</div>;

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-section">
          <h2>Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create Project
            </button>
          </form>
        </div>
      )}

      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status-badge status-${project.status}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <div className="meta-item">
                  <span className="label">Owner:</span>
                  <span>{project.owner.name}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Members:</span>
                  <span>{project.members.length}</span>
                </div>
                {project.endDate && (
                  <div className="meta-item">
                    <span className="label">Due:</span>
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="project-actions">
                <a href={`/projects/${project._id}`} className="btn btn-small">
                  View
                </a>
                {project.owner._id === user.id && (
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No projects yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
