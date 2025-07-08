const Labour = require("../models/Labour");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerLabour = async (req, res) => {
    try {
        const { name, skill, email, password } = req.body;

        let labour = await Labour.findOne({ email });
        if (labour) return res.status(400).json({ message: "Labour already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        labour = new Labour({ name, skill, email, password: hashedPassword });

        await labour.save();

        res.status(201).json({ message: "Labour registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginLabour = async (req, res) => {
    try {
        const { email, password } = req.body;

        const labour = await Labour.findOne({ email });
        if (!labour) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, labour.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: labour._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, labour });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
