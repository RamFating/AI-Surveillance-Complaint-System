import { Router } from "express";
import alertRoutes from "./alertRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import authRoutes from "./authRoutes.js";
import complaintRoutes from "./complaintRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/alerts", alertRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
