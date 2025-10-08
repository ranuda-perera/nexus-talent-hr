const express = require("express");
const multer = require("multer");
const { supabase } = require("../supabaseClient");
const router = express.Router();


// Use memory storage (keeps file in memory before uploading to Supabase)
const upload = multer({ storage: multer.memoryStorage() });

// ---------------- JOB IMAGE UPLOAD ----------------
router.post("/job-image", upload.single("industryImage"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = `job-images/${fileName}`;

        // Upload to Supabase Storage (public bucket)
        const { data, error } = await supabase.storage
            .from("job-images")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        // Generate public URL for the uploaded image
        const { data: publicUrl } = supabase.storage
            .from("job-images")
            .getPublicUrl(filePath);

        res.json({ url: publicUrl.publicUrl });
    } catch (err) {
        console.error("Error uploading job image:", err.message);
        res.status(500).json({ error: "Failed to upload job image" });
    }
});

// ---------------- RESUME UPLOAD ----------------
router.post("/resume", upload.single("resume"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = `resumes/${fileName}`;

        const { data, error } = await supabase.storage
            .from("resumes")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        // Create a signed URL (valid for 7 days)
        const { data: signed } = await supabase.storage
            .from("resumes")
            .createSignedUrl(filePath, 60 * 60 * 24 * 7);

        res.json({ url: signed.signedUrl });
    } catch (err) {
        console.error("Error uploading resume:", err.message);
        res.status(500).json({ error: "Failed to upload resume" });
    }
});

// ---------------- PASSPORT UPLOAD ----------------
router.post("/passport", upload.single("passportCopy"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = `passports/${fileName}`;

        const { data, error } = await supabase.storage
            .from("passports")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        const { data: signed } = await supabase.storage
            .from("passports")
            .createSignedUrl(filePath, 60 * 60 * 24 * 7);

        res.json({ url: signed.signedUrl });
    } catch (err) {
        console.error("Error uploading passport copy:", err.message);
        res.status(500).json({ error: "Failed to upload passport copy" });
    }
});

module.exports = router;