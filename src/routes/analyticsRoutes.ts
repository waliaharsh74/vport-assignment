import express from "express";
import { getAdminAnalytics, getVendorAnalytics } from "../controllers/analyticsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/admin", authMiddleware, roleMiddleware(["admin"]), getAdminAnalytics);
router.get("/vendor", authMiddleware, roleMiddleware(["vendor"]), getVendorAnalytics);

export default router;