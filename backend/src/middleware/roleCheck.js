// middleware/roleCheck.js
export const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        // If authMiddleware did not attach user
        return res.status(401).json({ message: "Authentication required" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "You do not have permission" });
      }

      // User role is allowed
      next();
    } catch (err) {
      console.error("Role check error:", err);
      res.status(500).json({ message: "Server error during role check" });
    }
  };
};
