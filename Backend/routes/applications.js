const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("../config/db");
const multer = require("multer");
const path = require("path");

// --------------------- FILE UPLOAD CONFIG ---------------------

// Storage configuration for Multer
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

router.post("/", upload.fields([{ name: "resume" }, { name: "passportCopy" }]), async (req, res) => {
    const { jobId, fullName, email, phone, country, age, gender, experience } = req.body;

    // Get uploaded file paths
    const resumePath = req.files["resume"] ? req.files["resume"][0].path : null;
    const passportPath = req.files["passportCopy"] ? req.files["passportCopy"][0].path : null;

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("JobId", sql.Int, jobId)
            .input("FullName", sql.NVarChar, fullName)
            .input("Email", sql.NVarChar, email)
            .input("Phone", sql.NVarChar, phone)
            .input("Country", sql.NVarChar, country)
            .input("Age", sql.Int, age)
            .input("Gender", sql.NVarChar, gender)
            .input("Experience", sql.NVarChar, experience)
            .input("Resume", sql.NVarChar, resumePath)
            .input("PassportCopy", sql.NVarChar, passportPath)
            .query(`
        INSERT INTO Applications
        (JobId, FullName, Email, Phone, Country, Age, Gender, Experience, Resume, PassportCopy, Status, CreatedAt)
        VALUES (@JobId, @FullName, @Email, @Phone, @Country, @Age, @Gender, @Experience, @Resume, @PassportCopy, 'pending', GETDATE())
      `);

        res.status(201).json({ message: "Application submitted successfully" });
    } catch (err) {
        console.error(" Error submitting application:", err);
        res.status(500).json({ message: "Error submitting application" });
    }
});

// --------------------- GET ALL APPLICATIONS ---------------------

router.get("/", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
      SELECT 
        a.Id AS id, 
        a.JobId AS jobId, 
        a.FullName AS fullName, 
        a.Email AS email, 
        a.Phone AS phone,
        a.Country AS country, 
        a.Age AS age, 
        a.Gender AS gender, 
        a.Experience AS experience,
        a.PassportCopy AS passportCopy, 
        a.Resume AS resume, 
        a.Status AS status, 
        a.CreatedAt AS appliedDate,
        j.Title AS jobTitle
      FROM Applications a
      LEFT JOIN Jobs j ON a.JobId = j.Id
      ORDER BY a.CreatedAt DESC
    `);

        res.json(result.recordset);
    } catch (err) {
        console.error(" Error fetching applications:", err);
        res.status(500).json({ message: "Error fetching applications" });
    }
});

// --------------------- UPDATE APPLICATION STATUS ---------------------

router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("Id", sql.Int, id)
            .input("Status", sql.NVarChar, status)
            .query(`
        UPDATE Applications
        SET Status = @Status
        WHERE Id = @Id
      `);

        res.json({ message: "Application status updated successfully" });
    } catch (err) {
        console.error(" Error updating application status:", err);
        res.status(500).json({ message: "Error updating application status" });
    }
});

// --------------------- DELETE APPLICATION ---------------------

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("Id", sql.Int, id)
            .query(`DELETE FROM Applications WHERE Id = @Id`);

        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        console.error(" Error deleting application:", err);
        res.status(500).json({ message: "Error deleting application" });
    }
});

module.exports = router;
