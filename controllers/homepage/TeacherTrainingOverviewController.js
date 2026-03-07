const TeacherTrainingHeading =
  require("../../models/homepage/TeacherTrainingOverviewModels");


// ✅ CREATE
exports.createHeading = async (req, res) => {
  try {
    const data = await TeacherTrainingHeading.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET ALL
exports.getHeadings = async (req, res) => {
  try {
    const data = await TeacherTrainingHeading.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE
exports.updateHeading = async (req, res) => {
  try {
    const data = await TeacherTrainingHeading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE
exports.deleteHeading = async (req, res) => {
  try {
    await TeacherTrainingHeading.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};