// authMiddleware.js
const jwt = require("jsonwebtoken");
const Labour = require("../models/labours");  // Import the Labour model

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
    const token = req.header("x-auth-token");  // Check for the token in the request headers

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the secret
        const labour = await Labour.findById(decoded.id);  // Find the labour based on the decoded ID

        if (!labour) {
            return res.status(401).json({ message: "Labour not found, authorization denied" });
        }

        req.labourId = decoded.id;  // Attach the labour ID to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });  // Handle invalid token
    }
};

// Admin Middleware (if needed for admin role checks, modify to use `Labour` model)
const adminMiddleware = async (req, res, next) => {
    if (req.labourId) {
        try {
            const labour = await Labour.findById(req.labourId);
            if (labour && labour.role === "admin") {  // Assuming 'role' is a field in your Labour schema
                return next();  // Proceed if the user is an admin
            } else {
                return res.status(403).json({ message: "Access denied, admin only" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Server error, unable to verify admin" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { authMiddleware, adminMiddleware };
