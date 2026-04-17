import { Router } from "express";
import { createAlert, getAlerts } from "../controllers/alertController.js";
import { allowAdminOrService } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAlerts);
router.post("/", allowAdminOrService, createAlert);

export default router;
