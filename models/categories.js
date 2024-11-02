const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  contributors: [
    {
      name: {
        type: String,
        required: true,
      },
      linkedin: {
        type: String,
        required: false,
      },
    }
  ]
});

module.exports = mongoose.model("CategorySchema", CategorySchema);
