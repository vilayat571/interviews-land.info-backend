const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Replace with your actual credentials
const GOOGLE_CLIENT_ID = '771346312955-2l4va2nf2na99h2kp501ij9s5ukld7gq.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://interviewsland-backend.onrender.com/auth/google/callback"
  },
  
  (accessToken, refreshToken, profile, done) => {
    // You can save the user profile to your database here
    return done(null, profile); // For this example, we'll just return the profile
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});
