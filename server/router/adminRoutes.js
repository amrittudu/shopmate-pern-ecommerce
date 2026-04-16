import express from "express";
const router = express.Router();

import { getAllUsers, deleteUser, dashboardStats } from "../controllers/adminController.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";

router.get("/getallusers", isAuthenticated, authorizedRoles("Admin"), getAllUsers);
router.delete("/deleteuser/:id", isAuthenticated, authorizedRoles("Admin"), deleteUser);
router.get("/fetch/dashboard-stats", isAuthenticated, authorizedRoles("Admin"), dashboardStats);

export default router;