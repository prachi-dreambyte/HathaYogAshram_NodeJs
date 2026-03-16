const HomeVideoSectionTwo = require("../../models/homepage/HomeVideoSectionTwoModel");

exports.get = async (req, res) => {
  try {
    const section = await HomeVideoSectionTwo.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: section || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const body = {};

    if (req.body.heading !== undefined) body.heading = req.body.heading;
    if (req.body.description !== undefined) body.description = req.body.description;
    if (req.body.videoUrl !== undefined) body.videoUrl = req.body.videoUrl;

    const updated = await HomeVideoSectionTwo.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
