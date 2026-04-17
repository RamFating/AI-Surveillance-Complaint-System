import { Router } from "express";
import { createAlert, getAlerts } from "../controllers/alertController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAlerts);
router.post("/", requireAuth, requireRole("admin"), createAlert);

export default router;
