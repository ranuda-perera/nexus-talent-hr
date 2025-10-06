const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getConnection, sql } = require("../config/db");

const SECRET_KEY = "supersecretkey";

// Register
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await getConnection();
        await pool.request()
            .input("email", sql.NVarChar, email)
            .input("passwordHash", sql.NVarChar, hashedPassword)
            .input("role", sql.NVarChar, role || "admin")
            .query("INSERT INTO Users (Email, PasswordHash, Role) VALUES (@email, @passwordHash, @role)");
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM Users WHERE Email = @email");

        if (result.recordset.length === 0) return res.status(400).json({ message: "Invalid credentials" });

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.Id, role: user.Role }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
