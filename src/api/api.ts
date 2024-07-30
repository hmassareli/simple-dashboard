import axios from "axios";

const token = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
