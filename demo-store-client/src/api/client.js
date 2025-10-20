import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:1337', // backend server
  headers: { 'Content-Type': 'application/json' }
});

// Automatically add token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;