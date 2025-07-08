const Labour = require("../models/labours");

// Register a new labour
exports.registerLabour = async (req, res) => {
    try {
        const { name, email, password, phone, place, skill } = req.body;  // Changed 'skills' to 'skill'
        console.log("Request Body:", req.body);

        // Check if labour already exists
        const existingLabour = await Labour.findOne({ email });
        if (existingLabour) {
            return res.status(400).json({ message: "Labour already registered" });
        }

        // Create new labour
        const newLabour = new Labour({ name, email, password, phone, place, skill });
        await newLabour.save();

        res.status(201).json({ message: "Labour registered successfully", labour: newLabour });
    } catch (error) {
        res.status(500).json({ message: "Error registering labour", error: error.message });
    }
};

// Labour login (dummy example, add authentication logic)
exports.loginLabour = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find labour by email
        const labour = await Labour.findOne({ email });
        if (!labour || labour.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Labour logged in successfully", labour });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Fetch all bookings for a labour
exports.getLabourBookings = async (req, res) => {
    try {
        // Assuming the labour's ID is stored in the request (from authentication middleware)
        const labourId = req.user._id;

        // Fetch the labour from DB, including bookings
        const labour = await Labour.findById(labourId).populate('bookings.userId'); // Assuming the bookings have a userId reference
        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        res.status(200).json({ message: "Bookings retrieved", bookings: labour.bookings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

// Update availability of labour (Accepts an array of available dates)
exports.updateAvailability = async (req, res) => {
    try {
        const { availableDates } = req.body; // Expected to be an array of date strings

        // Find the labour by ID (ensure authentication is done)
        const labour = await Labour.findById(req.user._id);
        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        // Update the labour's availability
        labour.availableDates = availableDates; // This should be an array of dates
        await labour.save();

        res.status(200).json({ message: "Availability updated", labour });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error: error.message });
    }
};

// Update booking status (Accept or Reject bookings)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;
        
        // Fetch the labour
        const labour = await Labour.findById(req.user._id);
        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        // Find the booking by its ID
        const booking = labour.bookings.id(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update the status of the booking
        booking.status = status;  // 'confirmed' or 'cancelled'
        await labour.save();

        res.status(200).json({ message: "Booking status updated", booking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking status", error: error.message });
    }
};

// Get all labours (for listing purposes)
exports.getLabours = async (req, res) => {
    try {
        const labours = await Labour.find();
        res.status(200).json(labours);
    } catch (error) {
        res.status(500).json({ message: "Error fetching labours", error: error.message });
    }
};
// Update Labour Profile
exports.updateLabourProfile = async (req, res) => {
    try {
        const labourId = req.user._id; // Get the logged-in labour's ID from the token
        const { name, place, phone, email, skill, experience, availableDates, pricePerHour } = req.body;

        // Find the labour document by ID and update the profile
        const labour = await Labour.findById(labourId);

        if (!labour) {
            return res.status(404).json({ message: 'Labour not found' });
        }

        // Update fields
        labour.name = name || labour.name;
        labour.place = place || labour.place;
        labour.phone = phone || labour.phone;
        labour.email = email || labour.email;
        labour.skill = skill || labour.skill;
        labour.experience = experience || labour.experience;
        labour.availableDates = availableDates || labour.availableDates;
        labour.pricePerHour = pricePerHour || labour.pricePerHour;

        // Save the updated labour document
        await labour.save();

        res.status(200).json({ message: 'Profile updated successfully', labour });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};
