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
const editQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    const editedData = await QuestionSchema.findByIdAndUpdate(
      id,
      { $set: req.body }, // Fields to update
      { new: true, runValidators: true } // Options: return the updated document and validate fields
    );

    if (!editedData) {
      return res.status(404).json({
        status: "FAILED",
        message: "Məlumat tapılmadı", // "Data not found"
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Məlumat yeniləndi", // "Data updated"
      editedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: "Xəta baş verdi!", // "An error occurred!"
    });
  }
};

const getSingleQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const singleQuestion = await QuestionSchema.findById(id);
    console.log(singleQuestion);

    if (!singleQuestion) {
      return res.status(404).json({
        status: "FAILED",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Question retrieved successfully",
      singleQuestion,
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return res.status(500).json({
      status: "FAILED",
      message: "An error occurred",
    });
  }
};

const deleteAQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      await QuestionSchema.findByIdAndDelete(id);

      return res.status(200).json({
        status: "OK",
        message: "Sual uğurla silinmişdir!",
      });
    } else {
      return res.status(404).json({
        status: "OK",
        message: "Belə bir sual yoxdur",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: "",
    });
  }
};

module.exports = {
  createQuestion,
  getQuestionByCategory,
  editQuestions,
  getSingleQuestion,
  deleteAQuestion
};
