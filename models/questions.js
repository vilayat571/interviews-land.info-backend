const mongoose = require("mongoose");

const iqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("iqSchema", iqSchema);
