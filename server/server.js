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

// CORS
const corsOptions = {
  origin: "http://localhost:3000", // frontend URL
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
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
