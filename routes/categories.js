const express = require("express");
const {
  createcategory,
  getCategories,
  getSingleCategory,
  editedCategory,
} = require("../controllers/categories.js");

const router = express.Router();

router.post("/api/v1/categories/add", createcategory);
router.get("/api/v1/categories", getCategories);
router.get("/api/v1/categories/:name", getSingleCategory);
router.put("/api/v1/categories/edit/:name", editedCategory);

module.exports = router;
