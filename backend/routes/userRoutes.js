const express = require("express");
const { registerUser , loginUser , getUserProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", registerUser );

// User Login
router.post("/login", loginUser );

// Get User Profile (Protected)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;

// END OF userRoutes.js