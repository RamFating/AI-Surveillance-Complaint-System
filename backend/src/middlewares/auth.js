import jwt from "jsonwebtoken";

export const requireAuth = (request, response, next) => {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return response.status(401).json({ success: false, message: "Authentication required." });
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET || "change-this-secret");
    return next();
  } catch (_error) {
    return response.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export const requireRole = (role) => (request, response, next) => {
  if (request.user?.role !== role) {
    return response.status(403).json({ success: false, message: "Insufficient permissions." });
  }

  return next();
};

export const allowAdminOrService = (request, response, next) => {
  const serviceToken = request.headers["x-service-token"];
  if (serviceToken && serviceToken === (process.env.AI_SHARED_SECRET || "change-this-ai-secret")) {
    request.service = { name: "ai-module" };
    return next();
  }

  return requireAuth(request, response, () => requireRole("admin")(request, response, next));
};
