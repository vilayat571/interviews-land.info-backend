const CategorySchema = require("../models/categories.js");

const createcategory = async (req, res) => {
  try {
    const { categoryname } = req.body;
    const isCategory = await CategorySchema.findOne({ categoryname });

    if (isCategory) {
      return res.status(404).json({
        status: "FAILED",
        message: "Belə kateqoriya artıq var!",
      });
    }

    const category = await CategorySchema.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Kateqoriya yaradıldı!",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await CategorySchema.find();

    return res.status(201).json({
      status: "OK",
      message: "Bütün kateqoriyalar!",
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const category = await CategorySchema.findOne({ categoryname: name });

    return res.status(201).json({
      status: "OK",
      message: "Kateqoriya!",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const editedCategory = async (req, res) => {
  const { name } = req.params;

  try {
    if (name) {
      const editeCategory = await CategorySchema.findOneAndUpdate(
        { categoryname: name },
        { $set: req.body }, // Fields to update
        { new: true, runValidators: true } //
      );

      return res.status(200).json({
        status: "OK",
        message: "Kateqoriya yeniləndi!",
        editeCategory,
      });
    } else {
      return res.status(404).json({
        status: "FAILED",
        message: "Kateqoriya tapılmadı!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: "Xəta baş verdi!",
    });
  }
};

module.exports = {
  createcategory,
  getCategories,
  getSingleCategory,
  editedCategory
};
