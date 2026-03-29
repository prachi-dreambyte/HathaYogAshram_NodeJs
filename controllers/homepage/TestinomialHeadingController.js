const TestimonialHeading = require("../../models/homepage/HomeTestinomialHeadingModel");

const normalizePayload = (body = {}) => ({
  mainHeading: String(body.mainHeading || "").trim(),
  subHeading: String(body.subHeading || "").trim(),
});

// Create
exports.createHeading = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    if (!payload.mainHeading || !payload.subHeading) {
      return res.status(400).json({
        success: false,
        message: "Main heading and sub heading are required",
      });
    }

    const existing = await TestimonialHeading.findOne().sort({ updatedAt: -1, createdAt: -1 });

    let heading;
    if (existing) {
      existing.mainHeading = payload.mainHeading;
      existing.subHeading = payload.subHeading;
      heading = await existing.save();
    } else {
      heading = await TestimonialHeading.create(payload);
    }

    res.status(201).json({
      success: true,
      message: "Heading saved successfully",
      data: heading,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get All
exports.getHeadings = async (req, res) => {
  try {
    const headings = await TestimonialHeading.find().sort({ updatedAt: -1, createdAt: -1 });

    res.json({
      success: true,
      data: headings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update
exports.updateHeading = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    if (!payload.mainHeading || !payload.subHeading) {
      return res.status(400).json({
        success: false,
        message: "Main heading and sub heading are required",
      });
    }

    const heading = await TestimonialHeading.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found",
      });
    }

    res.json({
      success: true,
      message: "Heading updated successfully",
      data: heading,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete
exports.deleteHeading = async (req, res) => {
  try {
    const deleted = await TestimonialHeading.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Heading not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
