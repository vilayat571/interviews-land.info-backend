const SuggestSchema = require("../models/suggests.js");

const addSuggest = async (req, res) => {
  try {
    const suggestContent = await SuggestSchema.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Təklif əlavə edildi!",
      suggests: suggestContent,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getSuggests = async (req, res) => {
  try {
    const suggests = await SuggestSchema.find();

    return res.status(201).json({
      status: "OK",
      message: "Bütün təkliflər!",
      count: suggests.length,
      suggests,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  addSuggest,
  getSuggests,
};
