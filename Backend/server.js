const express = require("express");
const cors = require("cors");
const path = require("path");

const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const applicationsRoutes = require("./routes/applications");
const contractsRoutes = require("./routes/contracts");

const app = express();

//  Proper CORS setup
app.use(
    cors({
        origin: ["https://www.nexustalenthr.com", "http://localhost:5173"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folders (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/contracts", contractsRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ message: "Nexus Talent API is running" });
});

//  Removed dist serving — handled by Vercel

// Error handler
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
    console.log(` Server is running on http://localhost:${PORT}`);
});

module.exports = app;
