const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables

const DB_URL = process.env.DB_URL;

db = () => {
  mongoose
    .connect( DB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err.message));
};

module.exports = db;
