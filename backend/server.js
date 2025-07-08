require("dotenv").config();  // Ensure dotenv is loaded at the very top to load .env variables
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");  // MongoDB connection
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const labourRoutes = require("./routes/labourRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/labour", labourRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

