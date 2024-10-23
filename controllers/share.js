const ShareSchema = require("../models/share.js");

const addExperience = async (req, res) => {
  try {
    const { category, description, fullName, status, title } =
      req.body;
    const idCode = String(Math.random()).slice(2, 7);
    const newReport = await ShareSchema.create({
      category,
      description,
      fullName,
      status,
      title,
      code: idCode,
    });

    const experiences = await ShareSchema.find();

    return res.status(201).json({
      status: "OK",
      message: "Təcrübəniz baxış üçün bazaya əlavə edildi!",
      count: experiences.length,
      code: newReport.code,
      report: newReport,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const allExperiences = async (req, res) => {
  try {
    const { status, category } = req.query;
    const limitValue = req.query.limit;
    const skipValue = req.query.skip;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    let experiences = await ShareSchema.find(filter)
      .limit(limitValue)
      .skip(skipValue);

    return res.status(200).json({
      status: "OK",
      message: "Bütün təcrübə mətnləri",
      count: experiences.length,
      experiences: experiences,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const findExperience = async (req, res) => {
  try {
    const { code } = await req.body;
    const idCode = await ShareSchema.findOne({ code });

    if (idCode) {
      return res.status(200).json({
        status: "OK",
        message: "Kodunuza uyğun təcrübə mətni!",
        experience: idCode,
      });
    } else {
      return res.status(200).json({
        status: "Failed",
        message: "Belə bir təcrübə mətni yoxdur!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      await ShareSchema.findByIdAndDelete(id);
      const experiences = await ShareSchema.find();
      return res.status(200).json({
        status: "OK",
        message: "Təcrübə mətni silinmişdir",
        count: experiences.length,
        experiences,
      });
    } else {
      const experiences = await ShareSchema.find();
      return res.status(401).json({
        status: "FAILED",
        message: "Belə bir təcrübə mətni yoxdur!",
        count: experiences.length,
        experiences,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  addExperience,
  allExperiences,
  deleteExperience,
  findExperience,
};
