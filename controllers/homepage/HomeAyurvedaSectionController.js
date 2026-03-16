const HomeAyurvedaSection = require("../../models/homepage/HomeAyurvedaSectionModel");

exports.get = async (req, res) => {
  try {
    const section = await HomeAyurvedaSection.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: section || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const body = {};

    if (req.body.title !== undefined) body.title = req.body.title;
    if (req.body.subtitle !== undefined) body.subtitle = req.body.subtitle;
    if (req.body.description !== undefined) body.description = req.body.description;
    if (req.body.imageUrl !== undefined) body.imageUrl = req.body.imageUrl;
    if (req.body.bookPath !== undefined) body.bookPath = req.body.bookPath;

    const updated = await HomeAyurvedaSection.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
