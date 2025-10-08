const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Use your new pg connection
const multer = require("multer");
const path = require("path");


// --------------------- FILE UPLOAD CONFIG ---------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "resume") cb(null, "uploads/resumes/");
        else if (file.fieldname === "passportCopy") cb(null, "uploads/passports/");
        else cb(null, "uploads/others/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// --------------------- CREATE APPLICATION ---------------------
// --------------------- CREATE APPLICATION ---------------------
router.post("/", async (req, res) => {
    const { jobId, fullName, email, phone, country, age, gender, experience, resume, passportCopy } = req.body;

    try {
        await pool.query(
            `INSERT INTO applicants
        (job_id, full_name, email, phone, country, age, gender, experience, resume, passport_copy, status, applied_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', NOW())`,
            [jobId, fullName, email, phone, country, age, gender, experience, resume || null, passportCopy || null]
        );

        res.status(201).json({ message: "Application submitted successfully" });
    } catch (err) {
        console.error("Error submitting application:", err);
        res.status(500).json({ message: "Error submitting application" });
    }
});

// --------------------- GET ALL APPLICATIONS ---------------------
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
         a.id,
         a.job_id AS "jobId",
         a.full_name AS "fullName",
         a.email,
         a.phone,
         a.country,
         a.age,
         a.gender,
         a.experience,
         a.passport_copy AS "passportCopy",
         a.resume,
         a.status,
         a.applied_date AS "appliedDate",
         j.title AS "jobTitle"
       FROM applicants a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.id DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching applications:", err);
        res.status(500).json({ message: "Error fetching applications" });
    }
});

// --------------------- UPDATE APPLICATION STATUS ---------------------
router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await pool.query(`UPDATE applicants SET status = $1 WHERE id = $2`, [status, id]);
        res.json({ message: "Application status updated successfully" });
    } catch (err) {
        console.error("Error updating application status:", err);
        res.status(500).json({ message: "Error updating application status" });
    }
});

// --------------------- DELETE APPLICATION ---------------------
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM applicants WHERE id = $1`, [id]);
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        console.error("Error deleting application:", err);
        res.status(500).json({ message: "Error deleting application" });
    }
});

module.exports = router;
