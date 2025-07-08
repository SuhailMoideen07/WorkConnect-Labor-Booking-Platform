const express = require("express");
const adminController = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin registration (optional)
router.post("/register", adminController.registerAdmin);

// Admin login
router.post("/login", adminController.loginAdmin);

// Get all users (Protected)
router.get("/users", authMiddleware, adminMiddleware, adminController.getAllUsers);

// Get all labours (Protected)
router.get("/labours", authMiddleware, adminMiddleware, adminController.getAllLabours);

// Get all bookings (Protected)
router.get("/bookings", authMiddleware, adminMiddleware, adminController.getAllBookings);

module.exports = router;