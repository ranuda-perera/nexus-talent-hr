const express = require("express");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const applicationsRoutes = require("./routes/applications");
const contractsRoutes = require("./routes/contracts");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/contracts", contractsRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ message: "Nexus Talent API is running" });
});

// Serve frontend
app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

module.exports = app;
