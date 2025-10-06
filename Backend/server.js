const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

// Import routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const applicationsRoutes = require("./routes/applications");
const contractsRoutes = require("./routes/contracts");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/contracts", contractsRoutes);

// API Health check
app.get("/api/health", (req, res) => {
    res.json({ message: "Nexus Talent API is running" });
});

// Serve React frontend from dist
app.use(express.static(path.join(__dirname, "./dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});

module.exports = app;
s = app;