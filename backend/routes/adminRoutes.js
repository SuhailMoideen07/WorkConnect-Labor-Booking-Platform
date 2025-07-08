const express = require("express");
const { loginAdmin, getAllUsers, getAllLabours, getAllBookings } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware"); // Import both auth and admin middleware

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);

// Get all users (Protected)
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Get all labours (Protected)
router.get("/labours", authMiddleware, adminMiddleware, getAllLabours);

// Get all bookings (Protected)
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
