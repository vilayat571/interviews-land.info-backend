const db = require("./config/db.js");
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
require('./controllers/passport-setup.js.js'); // Include your passport setup here
const Question = require("./routes/question.js");
const Category = require("./routes/categories.js");
const Shares = require("./routes/share.js");

// Initialize database connection
db();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');

// Set up session management
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes for Google Authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/profile'); // Change this to redirect to your profile page
  }
);

// Profile route
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Hello ${req.user.displayName}</h1><img src="${req.user.photos[0].value}"/>`);
  } else {
    res.redirect('/auth/google');
  }
});

// Include your API routes
app.use("/", Question);
app.use("/", Category);
app.use("/", Shares);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend started to listen on port ${PORT}`);
});
