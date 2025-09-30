import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// ------------------- User Management -------------------

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        enrollments: true, // Include enrollments
      },
    });
    
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" });
    if (!role) return res.status(400).json({ error: "Role is required" });

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, name: true, role: true },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ error: "Failed to update user role" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    await prisma.user.delete({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

// ** Add student **
export const addStudent = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newStudent = await prisma.user.create({
      data: {
        name,
        email,
        role: "STUDENT",
        password: await bcrypt.hash("defaultPassword123", 10), // temporary default password
      },
    });

    return res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ error: "Failed to add student" });
  }
};

// ------------------- Course Management -------------------

export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({ include: { instructor: true } });
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { instructor: true, modules: true },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    return res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, priceCents, difficulty } = req.body;

  try {
    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: { title, description, priceCents, difficulty },
    });
    return res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: "Failed to update course" });
  }
};

export const toggleCoursePublish = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({ where: { id: Number(id) } });
    if (!course) return res.status(404).json({ error: "Course not found" });

    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: { isPublished: !course.isPublished },
    });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error toggling course publish:", error);
    return res.status(500).json({ error: "Failed to toggle course publish status" });
  }
};

// ------------------- System Management -------------------

export const getSystemStats = async (req, res) => {
  try {
    const [userCount, courseCount, enrollmentCount, paymentSum] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.payment.aggregate({ _sum: { amountCents: true }, where: { status: "SUCCEEDED" } }),
    ]);

    return res.status(200).json({
      userCount,
      courseCount,
      enrollmentCount,
      totalRevenueCents: paymentSum._sum.amountCents || 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({ error: "Failed to fetch system stats" });
  }
};

export const updateSystemSettings = async (req, res) => {
  const { settings } = req.body;
  try {
    // Placeholder for real settings update
    return res.status(200).json({ message: "Settings updated successfully", settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ error: "Failed to update system settings" });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return res.status(500).json({ error: "Failed to fetch audit logs" });
  }
};
