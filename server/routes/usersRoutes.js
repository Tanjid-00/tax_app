const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import database connection

// GET /api/users - Get all registered users
router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users"); // Promise-based query
    res.json(users); // Return users data as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

module.exports = router;
