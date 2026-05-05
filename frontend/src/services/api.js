import axios from 'axios';

const API_BASE_URL = '/api';

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const projectService = {
  createProject: (name, description, endDate, token) =>
    axios.post(
      `${API_BASE_URL}/projects`,
      { name, description, endDate },
      { headers: getAuthHeader(token) }
    ),

  getProjects: (token) =>
    axios.get(`${API_BASE_URL}/projects`, {
      headers: getAuthHeader(token),
    }),

  getProject: (id, token) =>
    axios.get(`${API_BASE_URL}/projects/${id}`, {
      headers: getAuthHeader(token),
    }),

  updateProject: (id, data, token) =>
    axios.put(`${API_BASE_URL}/projects/${id}`, data, {
      headers: getAuthHeader(token),
    }),

  deleteProject: (id, token) =>
    axios.delete(`${API_BASE_URL}/projects/${id}`, {
      headers: getAuthHeader(token),
    }),

  addMember: (id, userId, role, token) =>
    axios.post(
      `${API_BASE_URL}/projects/${id}/members`,
      { userId, role },
      { headers: getAuthHeader(token) }
    ),

  removeMember: (id, userId, token) =>
    axios.delete(`${API_BASE_URL}/projects/${id}/members`, {
      headers: getAuthHeader(token),
      data: { userId },
    }),
};

export const taskService = {
  createTask: (projectId, taskData, token) =>
    axios.post(`${API_BASE_URL}/tasks/project/${projectId}`, taskData, {
      headers: getAuthHeader(token),
    }),

  getProjectTasks: (projectId, token) =>
    axios.get(`${API_BASE_URL}/tasks/project/${projectId}`, {
      headers: getAuthHeader(token),
    }),

  getTask: (id, token) =>
    axios.get(`${API_BASE_URL}/tasks/${id}`, {
      headers: getAuthHeader(token),
    }),

  updateTask: (id, data, token) =>
    axios.put(`${API_BASE_URL}/tasks/${id}`, data, {
      headers: getAuthHeader(token),
    }),

  deleteTask: (id, token) =>
    axios.delete(`${API_BASE_URL}/tasks/${id}`, {
      headers: getAuthHeader(token),
    }),

  addComment: (id, text, token) =>
    axios.post(
      `${API_BASE_URL}/tasks/${id}/comments`,
      { text },
      { headers: getAuthHeader(token) }
    ),

  getDashboard: (token) =>
    axios.get(`${API_BASE_URL}/tasks/dashboard/overview`, {
      headers: getAuthHeader(token),
    }),
};
