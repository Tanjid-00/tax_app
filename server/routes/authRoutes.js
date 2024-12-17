const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../config/db");

const router = express.Router();
const saltRounds = 10;

// Register Route
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  // check if each field is filled
  if (!userName || !email || !password) {
    return res.status(400).json({ Error: "All fields are required." });
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql =
      "INSERT INTO users (`userName`, `email`, `password`) VALUES (?)";
    const values = [userName, email, hashedPassword];

    // insert the user into the database
    db.query(sql, [values], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ Error: "Email already exists." });
        }
        return res.status(500).json({ Error: "Database error." });
      }
      return res.status(201).json({ Status: "User registered successfully." });
    });
  } catch (err) {
    return res.status(500).json({ Error: "Internal server error." });
  }
});

// Login Route
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ Error: "Invalid username or password" });
    }

    // Generate JWT token
    const payload = { id: user.id, userName: user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success response with token
    return res.status(200).json({
      Status: "Login successful",
      Token: token,
    });
  })(req, res, next);
});

// Logout Route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ Error: "Logout failed." });
    return res.status(200).json({ Status: "Logged out successfully." });
  });
});

// --------------------------------------- user show, add and delete
// Get all users
router.get("/users", (req, res) => {
  const query = "SELECT userId, userName, email, password FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ Error: "Failed to fetch users" });
    }
    res.status(200).json(results); // Return user data as JSON
  });
});

// Delete user by ID
router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE userId = ?";

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ Error: "Failed to delete user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json({ Status: "User deleted successfully" });
  });
});

module.exports = router;
