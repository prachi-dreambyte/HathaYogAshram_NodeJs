const WhyChooseHeading = require("../../models/homepage/WhychooseHeadingModels");

// Create
exports.createHeading = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Debug: check if body is received

    const { mainHeading, subHeading } = req.body;

    if (!mainHeading || !subHeading) {
      return res.status(400).json({
        success: false,
        error: "mainHeading and subHeading are required"
      });
    }

    const data = new WhyChooseHeading({ mainHeading, subHeading });
    const saved = await data.save();

    res.status(201).json({
      success: true,
      data: saved
    });

  } catch (error) {
    console.error("createHeading error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All
exports.getHeadings = async (req, res) => {
  try {
    const data = await WhyChooseHeading.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("getHeadings error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update
exports.updateHeading = async (req, res) => {
  try {
    console.log("Update req.body:", req.body); // Debug

    const { mainHeading, subHeading } = req.body;

    if (!mainHeading || !subHeading) {
      return res.status(400).json({
        success: false,
        error: "mainHeading and subHeading are required"
      });
    }

    const updated = await WhyChooseHeading.findByIdAndUpdate(
      req.params.id,
      { mainHeading, subHeading },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: "Record not found" });
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error("updateHeading error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete
exports.deleteHeading = async (req, res) => {
  try {
    const deleted = await WhyChooseHeading.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Record not found" });
    }

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {
    console.error("deleteHeading error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};