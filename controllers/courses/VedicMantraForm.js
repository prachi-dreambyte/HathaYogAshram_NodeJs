const VedicMantraForm = require("../../models/courses/VedicMantraForm");

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.email) query.email = String(req.query.email).toLowerCase();

    const data = await VedicMantraForm.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await VedicMantraForm.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      email: req.body.email ? String(req.body.email).toLowerCase() : req.body.email,
    };

    const data = await VedicMantraForm.create(payload);
    res.status(201).json({ success: true, data, message: "Created successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    };

    if (payload.email) {
      payload.email = String(payload.email).toLowerCase();
    }

    const data = await VedicMantraForm.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data, message: "Updated successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const data = await VedicMantraForm.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
