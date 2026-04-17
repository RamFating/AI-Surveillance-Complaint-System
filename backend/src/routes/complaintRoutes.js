import { Router } from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", getComplaints);
router.post("/", upload.single("image"), createComplaint);
router.patch("/:id/status", requireAuth, requireRole("admin"), updateComplaintStatus);

export default router;
