const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],  // Add role field with possible values
        default: "user",  // Default to 'user' unless specified
    },
    bookings: [
        {
            labourId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Labour",
            },
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ["pending", "confirmed", "completed", "cancelled"],
                default: "pending",
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
