import axios from "axios";
import { API_BASE_URL } from "../clientConfig.js";

const api = axios.create({
  baseURL: API_BASE_URL, // backend API
  withCredentials: false, // No cookies needed
});

// Add token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
