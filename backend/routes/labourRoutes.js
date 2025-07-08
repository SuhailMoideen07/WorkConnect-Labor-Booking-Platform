const express = require("express");
const { registerLabour, loginLabour, updateAvailability, getLabourBookings, updateBookingStatus, updateLabourProfile } = require("../controllers/labourController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new labour
router.post("/register", registerLabour);

// Login labour
router.post("/login", loginLabour);

// Update available dates (Protected)
router.post("/availability", authMiddleware, updateAvailability);

// Get all bookings for a labour (Protected)
router.get("/bookings", authMiddleware, getLabourBookings);

// Update booking status (Accept/Reject bookings)
router.put("/bookings/:bookingId/status", authMiddleware, updateBookingStatus);

// Update Labour Profile (Protected)
router.put("/updateProfile", authMiddleware, updateLabourProfile);

module.exports = router;
