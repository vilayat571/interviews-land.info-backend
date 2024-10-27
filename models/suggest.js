const mongoose = require("mongoose");

const SuggestSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("SuggestSchema", SuggestSchema);
