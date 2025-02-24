import axios from 'axios';

const API_URL = '/api/projects';

// Fetch all projects
export const fetchProjects = () => axios.get(API_URL);

// Fetch a single project by ID
export const fetchProjectById = (id) => axios.get(`${API_URL}/${id}`);

// Create a new project
export const createProject = (data) => axios.post(API_URL, data);

// Update a project
export const updateProject = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete a project
export const deleteProject = (id) => axios.delete(`${API_URL}/${id}`);
