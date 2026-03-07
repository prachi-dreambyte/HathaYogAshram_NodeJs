const TestimonialHeading = require("../../models/homepage/HomeTestinomialHeadingModel");


// Create
exports.createHeading = async (req, res) => {
  try {
    const heading = new TestimonialHeading(req.body);
    await heading.save();

    res.status(201).json({
      success: true,
      data: heading,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All
exports.getHeadings = async (req, res) => {
  try {
    const headings = await TestimonialHeading.find();

    res.json({
      success: true,
      data: headings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update
exports.updateHeading = async (req, res) => {
  try {
    const heading = await TestimonialHeading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: heading,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete
exports.deleteHeading = async (req, res) => {
  try {
    await TestimonialHeading.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};