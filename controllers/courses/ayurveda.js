const Ayurveda = require("../../models/courses/ayurveda");


// CREATE
exports.createAyurveda = async (req, res) => {
  try {

    const data = req.body;

    const newAyurveda = new Ayurveda({
      ...data,
      heroImage: req.files?.heroImage?.[0]?.filename,
      whatIsAyurvedaImage: req.files?.whatIsAyurvedaImage?.[0]?.filename,
      teacherTrainingImage: req.files?.teacherTrainingImage?.[0]?.filename,
      FoodImage: req.files?.FoodImage?.[0]?.filename,
      benefitsImage: req.files?.benefitsImage?.[0]?.filename,

      connectionItems: JSON.parse(data.connectionItems || "[]"),
      benefitsItems: JSON.parse(data.benefitsItems || "[]"),
      dinacharyaItems: JSON.parse(data.dinacharyaItems || "[]"),
      therapyItems: JSON.parse(data.therapyItems || "[]")
    });

    await newAyurveda.save();

    res.json({
      success: true,
      message: "Ayurveda created successfully",
      data: newAyurveda
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL
exports.getAyurveda = async (req, res) => {
  try {

    const data = await Ayurveda.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateAyurveda = async (req, res) => {

  try {

    const id = req.params.id;
    const data = req.body;

    const updateData = {
      ...data,
      connectionItems: JSON.parse(data.connectionItems || "[]"),
      benefitsItems: JSON.parse(data.benefitsItems || "[]"),
      dinacharyaItems: JSON.parse(data.dinacharyaItems || "[]"),
      therapyItems: JSON.parse(data.therapyItems || "[]")
    };

    if (req.files?.heroImage) {
      updateData.heroImage = req.files.heroImage[0].filename;
    }

    if (req.files?.whatIsAyurvedaImage) {
      updateData.whatIsAyurvedaImage = req.files.whatIsAyurvedaImage[0].filename;
    }

    if (req.files?.teacherTrainingImage) {
      updateData.teacherTrainingImage = req.files.teacherTrainingImage[0].filename;
    }

    if (req.files?.FoodImage) {
      updateData.FoodImage = req.files.FoodImage[0].filename;
    }

    if (req.files?.benefitsImage) {
      updateData.benefitsImage = req.files.benefitsImage[0].filename;
    }

    const updated = await Ayurveda.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteAyurveda = async (req, res) => {

  try {

    await Ayurveda.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};