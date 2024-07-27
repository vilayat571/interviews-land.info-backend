const QuestionSchema = require("../models/questions.js");

const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const isQuestion = await QuestionSchema.findOne({ title });

    if (isQuestion) {
      return res.status(404).json({
        status: "FAILED",
        message: "Belə sual artıq var!",
      });
    }

    const question = await QuestionSchema.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Sual yaradıldı!",
      question,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getQuestionByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await QuestionSchema.find();
    const fileterData = questions.filter((question) => {
      return question.category == category;
    });

    return res.status(200).json({
      status: "OK",
      message: "Suallar!",
      count: fileterData.length,
      questions: fileterData,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getQuestionByCategory,
};
