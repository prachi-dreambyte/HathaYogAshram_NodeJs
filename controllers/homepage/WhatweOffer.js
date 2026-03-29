const WhatWeOffer = require("../../models/homepage/WhatweOffer");
const path = require("path");
const fs = require("fs");

// ─── GET ALL ──────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const items = await WhatWeOffer.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET BY ID ────────────────────────────────────────────────────────────────
exports.getById = async (req, res) => {
  try {
    const item = await WhatWeOffer.findById(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const { icon, title, text, modalTitle, modalDescription, features, order } =
      req.body;

    // Parse features — accept JSON array or comma-separated string
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    const newItem = new WhatWeOffer({
      icon,
      title,
      text,
      image: req.file ? req.file.filename : null,
      modalContent: {
        title: modalTitle,
        description: modalDescription,
        features: parsedFeatures,
      },
      order: order ? Number(order) : 0,
    });

    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const existing = await WhatWeOffer.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ success: false, message: "Item not found" });

    const { icon, title, text, modalTitle, modalDescription, features, order } =
      req.body;

    // Parse features
    let parsedFeatures = existing.modalContent.features;
    if (features !== undefined) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    // Handle image replacement
    let imageName = existing.image;
    if (req.file) {
      // Delete old image if it exists
      if (existing.image) {
        const oldPath = path.join(__dirname, "../uploads", existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imageName = req.file.filename;
    }

    const updated = await WhatWeOffer.findByIdAndUpdate(
      req.params.id,
      {
        icon: icon ?? existing.icon,
        title: title ?? existing.title,
        text: text ?? existing.text,
        image: imageName,
        modalContent: {
          title: modalTitle ?? existing.modalContent.title,
          description: modalDescription ?? existing.modalContent.description,
          features: parsedFeatures,
        },
        order: order !== undefined ? Number(order) : existing.order,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const item = await WhatWeOffer.findById(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Item not found" });

    // Delete associated image file
    if (item.image) {
      const imgPath = path.join(__dirname, "../uploads", item.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await WhatWeOffer.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};