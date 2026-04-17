import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000
});

export const addComplaint = (payload) =>
  api.post("/complaints", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getComplaints = () => api.get("/complaints");
export const getAlerts = () => api.get("/alerts");
export const getAnalytics = () => api.get("/analytics/summary");

export default api;
