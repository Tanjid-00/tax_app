const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, db) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userName" },
      (userName, password, done) => {
        console.log("Attempting to authenticate user:", userName);
        const sql = "SELECT * FROM users WHERE userName = ?";
        db.query(sql, [userName], async (err, result) => {
          if (err) {
            console.error("Database query error:", err);
            return done(err);
          }

          if (result.length === 0) {
            console.log("User not found:", userName);
            return done(null, false, { message: "User not found." });
          }

          const user = result[0];
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            console.log("Invalid password for user:", userName);
            return done(null, false, { message: "Invalid password." });
          }

          console.log("User authenticated:", userName);
          return done(null, user);
        });
      }
    )
  );

  // Serialize user to store user information in the session (usually user ID)
  // Serialize user into session
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id); // Debugging information
    done(null, user.id); // Storing only the user ID in the session
  });

  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    console.log("Deserializing user with ID:", id); // Debugging information
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error during deserialization:", err);
        return done(err);
      }

      if (result.length === 0) {
        console.log("User not found during deserialization");
        return done(null, false);
      }

      const user = result[0];
      console.log("Deserialized user:", user); // Debugging information
      done(null, user); // Return the full user object
    });
  });

  // Example of registering a user (for signup functionality)
  passport.registerUser = (userName, email, password, done) => {
    // Check if the user already exists
    const checkSql = "SELECT * FROM users WHERE userName = ? OR email = ?";
    db.query(checkSql, [userName, email], async (err, result) => {
      if (err) return done(err);

      if (result.length > 0) {
        return done(null, false, { message: "User already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertSql =
        "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)";
      db.query(insertSql, [userName, email, hashedPassword], (err, result) => {
        if (err) return done(err);

        // Send the created user back
        const newUser = { id: result.insertId, userName, email };
        return done(null, newUser);
      });
    });
  };
};
