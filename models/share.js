const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ShareSchema", ShareSchema);
