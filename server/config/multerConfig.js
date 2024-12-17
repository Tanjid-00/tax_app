const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // আপলোড ফোল্ডার
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // ফাইলের ইউনিক নাম
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"]; // শুধুমাত্র PDF গ্রহণ করবে
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Multer Instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ৫ MB সাইজ লিমিট
  fileFilter: fileFilter,
});

module.exports = upload;
