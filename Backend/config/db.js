const sql = require("mssql");

const config = {
    user: "sa",             // your SQL Server username
    password: "Ranuda@123",
    server: "localhost",    // or localhost\SQLEXPRESS
    database: "JobPortal",
    options: {
        encrypt: false,       // set true if using Azure
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error(" DB Connection Failed:", err);
    }
}

module.exports = { sql, getConnection };
