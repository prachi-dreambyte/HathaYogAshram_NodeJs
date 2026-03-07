const HomeYogaAlliance = require("../../models/homepage/HomeYogaAllianceModels");


// CREATE
exports.createYogaAlliance = async (req, res) => {
  try {

    const images = req.files.map(file => file.path);

    const newData = new HomeYogaAlliance({
      image: images,
      mainHeading: req.body.mainHeading,
      subHeading: req.body.subHeading,
      Paragraph: req.body.Paragraph,
      title: req.body.title,
      Paragraph1: req.body.Paragraph1
    });

    const saved = await newData.save();

    res.json({
      success: true,
      data: saved
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getYogaAlliance = async (req, res) => {
  try {

    const data = await HomeYogaAlliance.find();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE
exports.updateYogaAlliance = async (req, res) => {
  try {

    const updateData = {
      mainHeading: req.body.mainHeading,
      subHeading: req.body.subHeading,
      Paragraph: req.body.Paragraph,
      title: req.body.title,
      Paragraph1: req.body.Paragraph1
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await HomeYogaAlliance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE
exports.deleteYogaAlliance = async (req, res) => {
  try {

    await HomeYogaAlliance.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};