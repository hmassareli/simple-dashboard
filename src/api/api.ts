import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log("request" + request.url, request);
  return request;
});

export default api;
