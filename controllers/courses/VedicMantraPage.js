const VedicMantra = require("../../models/courses/VedicMantraPage");


// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await VedicMantra.find().sort({ _id: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// CREATE
exports.create = async (req, res) => {
  try {
    const mantra = new VedicMantra(req.body);
    const saved = await mantra.save();

    res.json({
      success: true,
      message: "Content created successfully",
      data: saved,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// UPDATE
exports.update = async (req, res) => {
  try {
    const updated = await VedicMantra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Content updated successfully",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    await VedicMantra.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Content deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};