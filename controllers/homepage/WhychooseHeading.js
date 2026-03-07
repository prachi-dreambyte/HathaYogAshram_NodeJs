const WhyChooseHeading = require("../../models/homepage/WhychooseHeadingModels");

// Create
exports.createHeading = async (req, res) => {
  try {
    const data = new WhyChooseHeading(req.body);
    const saved = await data.save();

    res.status(201).json({
      success: true,
      data: saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateHeading = async (req, res) => {
  try {
    const updated = await WhyChooseHeading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteHeading = async (req, res) => {
  try {
    await WhyChooseHeading.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};