const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CategorySchema", CategorySchema);
