const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Supabase connection

// === CREATE CONTRACT ===
router.post("/", async (req, res) => {
    const {
        companyName,
        contactPerson,
        email,
        phone,
        industry,
        location,
        numberOfEmployees,
        jobType,
        startDate,
        duration,
        budget,
        budgetCurrency,
        requirements
    } = req.body;

    try {
        await pool.query(
            `INSERT INTO contracts
        (company_name, contact_person, email, phone, industry, location,
         number_of_employees, job_type, start_date, duration, budget,
         budget_currency, requirements, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'pending')`,
            [
                companyName,
                contactPerson,
                email,
                phone,
                industry,
                location,
                numberOfEmployees,
                jobType,
                startDate,
                duration,
                budget,
                budgetCurrency || "AED",
                requirements
            ]
        );

        res.status(201).json({ message: "Contract request submitted successfully" });
    } catch (err) {
        console.error("Error inserting contract:", err);
        res.status(500).json({ message: "Error submitting contract request" });
    }
});

// === GET ALL CONTRACTS ===
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
         id,
         company_name AS "companyName",
         contact_person AS "contactPerson",
         email,
         phone,
         industry,
         location,
         number_of_employees AS "numberOfEmployees",
         job_type AS "jobType",
         start_date AS "startDate",
         duration,
         budget,
         budget_currency AS "budgetCurrency",
         requirements,
         status,
         created_at AS "createdAt"
       FROM contracts
       ORDER BY id DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching contracts:", err);
        res.status(500).json({ message: "Error fetching contracts" });
    }
});

// === GET SINGLE CONTRACT BY ID ===
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT
         id,
         company_name AS "companyName",
         contact_person AS "contactPerson",
         email,
         phone,
         industry,
         location,
         number_of_employees AS "numberOfEmployees",
         job_type AS "jobType",
         start_date AS "startDate",
         duration,
         budget,
         budget_currency AS "budgetCurrency",
         requirements,
         status,
         created_at AS "createdAt"
       FROM contracts
       WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Contract not found" });

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching contract:", err);
        res.status(500).json({ message: "Error fetching contract" });
    }
});

// === UPDATE CONTRACT STATUS ===
router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await pool.query(`UPDATE contracts SET status = $1 WHERE id = $2`, [status, id]);
        res.json({ message: "Contract status updated successfully" });
    } catch (err) {
        console.error("Error updating contract status:", err);
        res.status(500).json({ message: "Error updating contract status" });
    }
});

// === DELETE CONTRACT ===
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM contracts WHERE id = $1`, [id]);
        res.json({ message: "Contract deleted successfully" });
    } catch (err) {
        console.error("Error deleting contract:", err);
        res.status(500).json({ message: "Error deleting contract" });
    }
});

module.exports = router;
