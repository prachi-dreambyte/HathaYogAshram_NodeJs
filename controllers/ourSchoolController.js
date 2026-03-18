const OurSchool = require("../models/ourSchool/OurSchoolModel");

exports.get = async (req, res) => {
  try {
    const item = await OurSchool.findOne().sort({ updatedAt: -1 });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await OurSchool.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const existing = await OurSchool.findOne().sort({ updatedAt: -1 });
    if (existing) {
      const updated = await OurSchool.findByIdAndUpdate(existing._id, req.body, {
        new: true,
      });
      return res.json({ success: true, data: updated });
    }
    const created = await OurSchool.create(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await OurSchool.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};