const ShareSchema = require("../models/share.js");

const addExperience = async (req, res) => {
    try {
      const { category, description, fullName, status, title } = req.body;
      
      // Generate a unique ID code
      const idCode = String(Date.now()).slice(-5); // Using timestamp for better uniqueness
  
      const newReport = await ShareSchema.create({
        category,
        description,
        fullName,
        status,
        title,
        code: idCode,
      });
  
      // The newReport is already saved, so no need to call newReport.save() again
  
      const experiences = await ShareSchema.find();
  
      return res.status(201).json({
        status: "OK",
        message: "Təcrübəniz baxış üçün bazaya əlavə edildi!",
        count: experiences.length,
        code: idCode,
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
        .skip(skipValue)
        .select("category description fullName status title code"); // Ensure 'code' is included
  
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
      const { code } = req.body;  // Ensure code is passed from the client
      const experience = await ShareSchema.findOne({ code });
  
      if (experience) {
        return res.status(200).json({
          status: "OK",
          message: "Kodunuza uyğun təcrübə mətni!",
          experience,
        });
      } else {
        return res.status(404).json({
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
