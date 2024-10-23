const express = require("express");
const {
  addExperience,
  allExperiences,
  deleteExperience,
  findExperience,
} = require("../controllers/share");
const router = express.Router();

router.post("/api/v1/experiences/add", addExperience);
router.get("/api/v1/experiences", allExperiences);
router.delete("/api/v1/experiences/delete/:id", deleteExperience);
router.post("/api/v1/experiences/find", findExperience);

module.exports = router;
