require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");
const app = express();
require("./config/passport")(passport, db);

// ---------------------------------------------- pdf file upload

const taxRoutes = require("./routes/taxRoutes");
app.use("/api/tax", taxRoutes);

const fileRoutes = require("./routes/fileRoutes"); // ফাইল রাউট ইমপোর্ট
app.use("/api/files", fileRoutes); // API রাউট হিসাবে যুক্ত

const multer = require("multer");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ফাইল কোথায় সংরক্ষণ হবে
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // ফাইলের নাম নির্ধারণ
  },
});

// Multer instance
const upload = multer({ storage });

// আপলোড হওয়া ফাইল অ্যাক্সেস করার জন্য uploads ফোল্ডার স্ট্যাটিক ফাইল হিসেবে সার্ভ করুন। এটি server.js এ যুক্ত করুন:

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  ---------------------------------------------- pdf file upload end

const usersRoutes = require("./routes/usersRoutes"); // Import the users route
app.use("/api/users", usersRoutes); // API রুট হিসাবে ব্যবহার

// CORS
const corsOptions = {
  origin: "http://localhost:3000", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // অনুমোদিত মেথড  allowedHeaders: "Content-Type,Authorization",
  credential: true,
};

app.use(cors(corsOptions)); // CORS modules

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // secret key which encrypt session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use `secure: true` in production with HTTPS
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// JSON body pursing
app.use(express.json()); // to take json data from frontend
app.use(express.urlencoded({ extended: true })); // to take URL-encoded data

// Routes (After Session Middleware)
app.use("/authRoutes", authRoutes);

// Serve React Frontend
app.use(express.static(path.join(__dirname, "../client/build"))); // React build folder

// Any other request will be directed to React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
