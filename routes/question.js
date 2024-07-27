const express = require("express");
const { createQuestion, getQuestionByCategory } = require("../controllers/question.js");

const router = express.Router();

router.post("/api/v1/questions/add", createQuestion);
router.get("/api/v1/questions/:category", getQuestionByCategory);



module.exports=router