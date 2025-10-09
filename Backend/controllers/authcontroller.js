const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // pg connection
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";


// Register admin (only used once manually)
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO admins (email, password_hash, full_name) VALUES ($1, $2, $3)",
            [email, hashedPassword, role || "Admin User"]
        );

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Login for admin
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);

        if (result.rows.length === 0)
            return res.status(400).json({ message: "Invalid credentials" });

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: "admin" }, SECRET_KEY, { expiresIn: "2h" });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
