const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("../config/db");

// Create contract
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
        const pool = await getConnection();
        await pool.request()
            .input("CompanyName", sql.NVarChar, companyName)
            .input("ContactPerson", sql.NVarChar, contactPerson)
            .input("Email", sql.NVarChar, email)
            .input("Phone", sql.NVarChar, phone)
            .input("Industry", sql.NVarChar, industry)
            .input("Location", sql.NVarChar, location)
            .input("NumberOfEmployees", sql.Int, numberOfEmployees)
            .input("JobType", sql.NVarChar, jobType)
            .input("StartDate", sql.Date, startDate)
            .input("Duration", sql.NVarChar, duration)
            .input("Budget", sql.NVarChar, budget)
            .input("BudgetCurrency", sql.NVarChar, budgetCurrency || 'AED')
            .input("Requirements", sql.NVarChar, requirements)
            .query(`
                INSERT INTO Contracts
                (CompanyName, ContactPerson, Email, Phone, Industry, Location, NumberOfEmployees, JobType, StartDate, Duration, Budget, BudgetCurrency, Requirements, Status)
                VALUES (@CompanyName, @ContactPerson, @Email, @Phone, @Industry, @Location, @NumberOfEmployees, @JobType, @StartDate, @Duration, @Budget, @BudgetCurrency, @Requirements, 'pending')
            `);

        res.status(201).json({ message: "Contract request submitted successfully" });
    } catch (err) {
        console.error("Error inserting contract:", err);
        res.status(500).json({ message: "Error submitting contract request" });
    }
});

// Get all contracts
router.get("/", async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                Id AS id,
                CompanyName AS companyName,
                ContactPerson AS contactPerson,
                Email AS email,
                Phone AS phone,
                Industry AS industry,
                Location AS location,
                NumberOfEmployees AS numberOfEmployees,
                JobType AS jobType,
                StartDate AS startDate,
                Duration AS duration,
                Budget AS budget,
                BudgetCurrency AS budgetCurrency,
                Requirements AS requirements,
                Status AS status,
                CreatedAt AS createdAt
            FROM Contracts
            ORDER BY CreatedAt DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error("Error fetching contracts:", err);
        res.status(500).json({ message: "Error fetching contracts" });
    }
});

// Get single contract by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                SELECT 
                    Id AS id,
                    CompanyName AS companyName,
                    ContactPerson AS contactPerson,
                    Email AS email,
                    Phone AS phone,
                    Industry AS industry,
                    Location AS location,
                    NumberOfEmployees AS numberOfEmployees,
                    JobType AS jobType,
                    StartDate AS startDate,
                    Duration AS duration,
                    Budget AS budget,
                    BudgetCurrency AS budgetCurrency,
                    Requirements AS requirements,
                    Status AS status,
                    CreatedAt AS createdAt
                FROM Contracts
                WHERE Id = @Id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Contract not found" });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching contract:", err);
        res.status(500).json({ message: "Error fetching contract" });
    }
});

// Update contract status
router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Id", sql.Int, id)
            .input("Status", sql.NVarChar, status)
            .query(`
                UPDATE Contracts
                SET Status = @Status
                WHERE Id = @Id
            `);

        res.json({ message: "Contract status updated successfully" });
    } catch (err) {
        console.error("Error updating contract status:", err);
        res.status(500).json({ message: "Error updating contract status" });
    }
});

// Delete contract
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                DELETE FROM Contracts
                WHERE Id = @Id
            `);

        res.json({ message: "Contract deleted successfully" });
    } catch (err) {
        console.error("Error deleting contract:", err);
        res.status(500).json({ message: "Error deleting contract" });
    }
});

module.exports = router;