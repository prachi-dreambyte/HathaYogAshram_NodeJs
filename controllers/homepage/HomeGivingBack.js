const HomeGivingBack = require("../../models/homepage/HomeGivingBack");
const path = require("path");
const fs = require("fs");

// GET all entries
exports.getAll = async (req, res) => {
  try {
    const data = await HomeGivingBack.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE a new entry
exports.create = async (req, res) => {
  try {
    const images = req.files.map(file => file.path.replace(/\\/g, "/"));
    const { mainHeading, subHeading, Paragraph } = req.body;

    const newItem = await HomeGivingBack.create({
      image: images,
      mainHeading,
      subHeading,
      Paragraph,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE an entry
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainHeading, subHeading, Paragraph } = req.body;

    const item = await HomeGivingBack.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    // Delete old images if new ones uploaded
    if (req.files && req.files.length > 0) {
      item.image.forEach(imgPath => {
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
      item.image = req.files.map(file => file.path.replace(/\\/g, "/"));
    }

    item.mainHeading = mainHeading;
    item.subHeading = subHeading;
    item.Paragraph = Paragraph;

    await item.save();

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE an entry
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await HomeGivingBack.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    // delete images from server
    item.image.forEach(imgPath => {
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await item.remove();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};