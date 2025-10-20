import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:1337", // backend API
  withCredentials: false, // No cookies needed
});

export default api;