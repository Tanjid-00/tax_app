const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig"); // Multer configuration
const db = require("../config/db"); // MySQL connection

// File upload and store in database
router.post("/upload", upload.array("files", 10), (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Store each file's data in the database
    const fileDetails = [];
    files.forEach((file) => {
      const { filename, path: filepath } = file;

      // Save to database
      db.query(
        "INSERT INTO uploaded_files (filename, filepath) VALUES (?, ?)",
        [filename, filepath],
        (err) => {
          if (err) {
            console.error("Database error:", err);
          }
        }
      );

      // Add file details to response array
      fileDetails.push({ filename, filepath });
    });

    res.status(200).json({
      message: "Files uploaded successfully",
      files: fileDetails,
    });
  } catch (error) {
    console.error("File upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

module.exports = router;
