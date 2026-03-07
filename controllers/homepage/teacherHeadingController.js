const TeacherHeading = require("../../models/homepage/TeacherHeadingModel");

// CREATE
exports.createHeading = async (req, res) => {
  try {
    const { mainHeading, subHeading } = req.body;

    if (!mainHeading || !subHeading) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newHeading = await TeacherHeading.create({
      mainHeading,
      subHeading
    });

    res.status(201).json(newHeading);

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// GET ALL
exports.getAllHeadings = async (req, res, next) => {
  try {
    const headings = await TeacherHeading.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: headings.length,
      data: headings
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE
exports.getHeadingById = async (req, res, next) => {
  try {
    const heading = await TeacherHeading.findById(req.params.id);

    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found"
      });
    }

    res.status(200).json({
      success: true,
      data: heading
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
exports.updateHeading = async (req, res, next) => {
  try {
    const heading = await TeacherHeading.findById(req.params.id);

    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found"
      });
    }

    const updated = await TeacherHeading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.deleteHeading = async (req, res, next) => {
  try {
    const heading = await TeacherHeading.findById(req.params.id);

    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found"
      });
    }

    await heading.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};