import { alerts, complaints } from "../data/mockStore.js";

export const getSummary = (_request, response) => {
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter((item) => item.status === "Pending").length;
  const resolvedComplaints = complaints.filter((item) => item.status === "Resolved").length;
  const activeAlerts = alerts.length;

  return response.json({
    success: true,
    data: {
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      activeAlerts
    }
  });
};
