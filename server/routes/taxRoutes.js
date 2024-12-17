const express = require("express");
const multer = require("multer");
const router = express.Router();

// Multer configuration (আপনার multerConfig.js থেকে ইম্পোর্ট করুন)
const upload = require("../config/multerConfig");

// POST রুট হ্যান্ডলার hmm
router.post(
  "/submit",
  upload.fields([
    { name: "bankStatement", maxCount: 1 },
    { name: "remittance", maxCount: 1 },
    { name: "dpsStatement", maxCount: 1 },
    { name: "fdrStatement", maxCount: 1 },
    { name: "lastTaxFile", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      // ফাইল এবং টেক্সট ডেটা অ্যাক্সেস করুন
      const details = JSON.parse(req.body.details);
      const uploadFiles = JSON.parse(req.body.uploadFiles);
      // const uploadFiles = req.files; // আপলোড ফাইল ডেটা

      console.log("Details:", details);
      console.log("Uploaded Files:", req.files);

      // সফল রেসপন্স পাঠান
      res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error during submission:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  }
);

module.exports = router;
