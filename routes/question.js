const express = require("express");
const {
  createQuestion,
  getQuestionByCategory,
  editQuestions,
  getSingleQuestion,
  deleteAQuestion,
} = require("../controllers/question.js");

const router = express.Router();

router.post("/api/v1/questions/add", createQuestion);
router.get("/api/v1/questions/:category", getQuestionByCategory);
router.put("/api/v1/questions/edit/:category/:id", editQuestions);
router.get("/api/v1/questions/:category/:id", getSingleQuestion);
router.delete("/api/v1/questions/delete/:category/:id", deleteAQuestion);

module.exports = router;
