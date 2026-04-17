import { alerts, getNextId } from "../data/mockStore.js";

export const getAlerts = (_request, response) => {
  const sortedAlerts = [...alerts].sort((left, right) => right.id - left.id);

  return response.json({
    success: true,
    data: sortedAlerts
  });
};

export const createAlert = (request, response) => {
  const { title, message, severity = "High", source = "AI Module", camera_id = null } =
    request.body;

  if (!title || !message) {
    return response.status(400).json({
      success: false,
      message: "Title and message are required."
    });
  }

  const alert = {
    id: getNextId(alerts),
    title,
    message,
    severity,
    source,
    camera_id,
    createdAt: new Date().toISOString()
  };

  alerts.unshift(alert);

  return response.status(201).json({
    success: true,
    message: "Alert stored successfully.",
    data: alert
  });
};
