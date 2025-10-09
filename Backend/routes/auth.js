const express = require("express");
const jwt = require("jsonwebtoken");
const { login, register } = require("../controllers/authcontroller");

const router = express.Router();

// Register (one-time for creating admin)
router.post("/register", register);

// Login
router.post("/login", login);

// ✅ Token verification route
router.get("/verify", (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "supersecretkey"
        );

        res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
        console.error("Verification error:", err.message);
        res.status(500).json({ message: "Verification failed" });
    }
});

module.exports = router;
