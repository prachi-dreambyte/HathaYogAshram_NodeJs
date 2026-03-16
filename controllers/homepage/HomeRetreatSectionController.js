const HomeRetreatSection = require("../../models/homepage/HomeRetreatSectionModel");

exports.get = async (req, res) => {
  try {
    const section = await HomeRetreatSection.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: section || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const body = {};

    if (req.body.title !== undefined) body.title = req.body.title;
    if (req.body.highlightText !== undefined) body.highlightText = req.body.highlightText;
    if (req.body.description !== undefined) body.description = req.body.description;

    const updated = await HomeRetreatSection.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
