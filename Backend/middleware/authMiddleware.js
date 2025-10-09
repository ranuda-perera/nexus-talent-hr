const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";


function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(403).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Invalid token" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;
