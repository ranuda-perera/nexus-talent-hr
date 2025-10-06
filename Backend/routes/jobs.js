const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("../config/db");
const multer = require("multer");
const path = require("path");



// === Multer Storage for Industry Images ===
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/industry_images/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });


// === CREATE JOB ===
router.post("/", upload.single("industryImage"), async (req, res) => {
    const {
        title,
        company,
        location,
        type,
        experience,
        salary,
        salaryCurrency,
        description,
        gender,
        industry,
    } = req.body;

    const industryImage = req.file ? req.file.path : null;

    try {
        const pool = await getConnection();

        await pool.request()
            .input("Title", sql.NVarChar, title)
            .input("Company", sql.NVarChar, company)
            .input("Location", sql.NVarChar, location)
            .input("Type", sql.NVarChar, type)
            .input("Experience", sql.NVarChar, experience)
            .input("Salary", sql.NVarChar, salary)
            .input("SalaryCurrency", sql.NVarChar, salaryCurrency || "AED")
            .input("Description", sql.NVarChar, description)
            .input("Gender", sql.NVarChar, gender)
            .input("Industry", sql.NVarChar, industry || null)
            .input("IndustryImage", sql.NVarChar, industryImage || null)
            .query(`
        INSERT INTO Jobs 
        (Title, Company, Location, Type, Experience, Salary, SalaryCurrency, Description, Gender, Industry, IndustryImage, CreatedAt)
        VALUES (@Title, @Company, @Location, @Type, @Experience, @Salary, @SalaryCurrency, @Description, @Gender, @Industry, @IndustryImage, GETDATE())
      `);

        res.status(201).json({ message: "Job created successfully" });
    } catch (err) {
        console.error("Error inserting job:", err);
        res.status(500).json({ message: "Error creating job" });
    }
});


// === GET ALL JOBS ===
router.get("/", async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool.request().query(`
      SELECT 
        Id AS id,
        Title AS title,
        Company AS company,
        Location AS location,
        Type AS type,
        Experience AS experience,
        Salary AS salary,
        SalaryCurrency AS salaryCurrency,
        Description AS description,
        Gender AS gender,
        Industry AS industry,
        IndustryImage AS industryImage,
        CreatedAt AS createdAt
      FROM Jobs
      ORDER BY CreatedAt DESC
    `);

        res.json(result.recordset);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ message: "Error fetching jobs" });
    }
});


// === GET SINGLE JOB BY ID ===
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
        SELECT 
          Id AS id,
          Title AS title,
          Company AS company,
          Location AS location,
          Type AS type,
          Experience AS experience,
          Salary AS salary,
          SalaryCurrency AS salaryCurrency,
          Description AS description,
          Gender AS gender,
          Industry AS industry,
          IndustryImage AS industryImage,
          CreatedAt AS createdAt
        FROM Jobs
        WHERE Id = @Id
      `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching job:", err);
        res.status(500).json({ message: "Error fetching job" });
    }
});


// === UPDATE JOB ===
router.put("/:id", upload.single("industryImage"), async (req, res) => {
    const { id } = req.params;
    const {
        title,
        company,
        location,
        type,
        experience,
        salary,
        salaryCurrency,
        description,
        gender,
        industry,
    } = req.body;

    const industryImage = req.file ? req.file.path : null;

    try {
        const pool = await getConnection();

        await pool.request()
            .input("Id", sql.Int, id)
            .input("Title", sql.NVarChar, title)
            .input("Company", sql.NVarChar, company)
            .input("Location", sql.NVarChar, location)
            .input("Type", sql.NVarChar, type)
            .input("Experience", sql.NVarChar, experience)
            .input("Salary", sql.NVarChar, salary)
            .input("SalaryCurrency", sql.NVarChar, salaryCurrency || "AED")
            .input("Description", sql.NVarChar, description)
            .input("Gender", sql.NVarChar, gender)
            .input("Industry", sql.NVarChar, industry || null)
            .input("IndustryImage", sql.NVarChar, industryImage || null)
            .query(`
        UPDATE Jobs
        SET Title = @Title,
            Company = @Company,
            Location = @Location,
            Type = @Type,
            Experience = @Experience,
            Salary = @Salary,
            SalaryCurrency = @SalaryCurrency,
            Description = @Description,
            Gender = @Gender,
            Industry = @Industry,
            IndustryImage = @IndustryImage
        WHERE Id = @Id
      `);

        res.json({ message: "Job updated successfully" });
    } catch (err) {
        console.error("Error updating job:", err);
        res.status(500).json({ message: "Error updating job" });
    }
});


// === DELETE JOB ===
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Id", sql.Int, id)
            .query(`DELETE FROM Jobs WHERE Id = @Id`);

        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        console.error("Error deleting job:", err);
        res.status(500).json({ message: "Error deleting job" });
    }
});

module.exports = router;
