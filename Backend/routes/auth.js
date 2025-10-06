const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Register (one-time for creating admin)
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;
