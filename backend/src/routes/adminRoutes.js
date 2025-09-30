import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleCheck } from "../middleware/roleCheck.js";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  addStudent,
  getAllCourses,
  getCourseById,
  updateCourse,
  toggleCoursePublish,
  getSystemStats,
  updateSystemSettings,
  getAuditLogs,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// Apply auth middleware
adminRouter.use(authMiddleware);

// User Management
adminRouter.get("/users", roleCheck(["ADMIN"]), getAllUsers);
adminRouter.get("/users/:id", roleCheck(["ADMIN"]), getUserById);
adminRouter.put("/users/:id", roleCheck(["ADMIN"]), updateUserRole);
adminRouter.delete("/users/:id", roleCheck(["ADMIN"]), deleteUser);
adminRouter.post("/users", roleCheck(["ADMIN"]), addStudent); // New student route

// Course Management
adminRouter.get("/courses", roleCheck(["ADMIN", "INSTRUCTOR"]), getAllCourses);
adminRouter.get("/courses/:id", roleCheck(["ADMIN", "INSTRUCTOR"]), getCourseById);
adminRouter.put("/courses/:id", roleCheck(["ADMIN", "INSTRUCTOR"]), updateCourse);
adminRouter.put("/courses/:id/publish", roleCheck(["ADMIN", "INSTRUCTOR"]), toggleCoursePublish);

// System Administration
adminRouter.get("/stats", roleCheck(["ADMIN"]), getSystemStats);
adminRouter.put("/settings", roleCheck(["ADMIN"]), updateSystemSettings);
adminRouter.get("/audit-logs", roleCheck(["ADMIN"]), getAuditLogs);

export default adminRouter;
