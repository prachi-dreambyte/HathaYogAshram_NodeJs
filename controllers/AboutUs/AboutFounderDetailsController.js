const AboutFounderDetails = require("../../models/AboutUs/AboutFounderDetailsModels");
const path = require("path");
const fs   = require("fs");

// ── Helpers ───────────────────────────────────────────────────────────────────
const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const deleteFileFromUrl = (url) => {
  if (!url) return;
  const filename = url.split("/uploads/")[1];
  if (!filename) return;
  const filePath = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// Build philosophyItems array from multipart fields + uploaded icon files
const parsePhilosophyItems = (req, existingItems = []) => {
  const items = [];
  for (let i = 0; i < 4; i++) {
    const heading   = req.body[`philoHeading_${i}`]   || "";
    const paragraph = req.body[`philoParagraph_${i}`] || "";
    const fileObj   = req.files?.[`philoIcon_${i}`]?.[0];

    let icon = existingItems[i]?.icon || ""; // keep existing by default
    if (fileObj) {
      // New icon uploaded — delete old one
      deleteFileFromUrl(existingItems[i]?.icon);
      icon = imageUrl(req, fileObj.filename);
    }

    items.push({ icon, heading, paragraph });
  }
  return items;
};

// ── CRUD ──────────────────────────────────────────────────────────────────────

exports.getAll = async (req, res) => {
  try {
    const data = await AboutFounderDetails.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await AboutFounderDetails.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = {
      founderName:      req.body.founderName,
      role:             req.body.role,
      shortTitle:       req.body.shortTitle,
      stats:            req.body.stats,
      mainQuote:        req.body.mainQuote,
      quoteTitle:       req.body.quoteTitle,
      mainBiography:    req.body.mainBiography,
      bioTitle:         req.body.bioTitle,
      mainPhilosophy:   req.body.mainPhilosophy,
      philosophyItems:  parsePhilosophyItems(req),
      heading:          req.body.heading,
      description:      req.body.description,
      mainAchievements: req.body.mainAchievements,
      text:             req.body.text,
    };

    if (req.files?.img?.[0]) body.img = imageUrl(req, req.files.img[0].filename);

    const newItem = await AboutFounderDetails.create(body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await AboutFounderDetails.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    const body = {
      founderName:      req.body.founderName,
      role:             req.body.role,
      shortTitle:       req.body.shortTitle,
      stats:            req.body.stats,
      mainQuote:        req.body.mainQuote,
      quoteTitle:       req.body.quoteTitle,
      mainBiography:    req.body.mainBiography,
      bioTitle:         req.body.bioTitle,
      mainPhilosophy:   req.body.mainPhilosophy,
      philosophyItems:  parsePhilosophyItems(req, existing.philosophyItems),
      heading:          req.body.heading,
      description:      req.body.description,
      mainAchievements: req.body.mainAchievements,
      text:             req.body.text,
    };

    if (req.files?.img?.[0]) {
      deleteFileFromUrl(existing.img);
      body.img = imageUrl(req, req.files.img[0].filename);
    }

    const updated = await AboutFounderDetails.findByIdAndUpdate(
      req.params.id, body, { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await AboutFounderDetails.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    deleteFileFromUrl(item.img);
    item.philosophyItems.forEach((p) => deleteFileFromUrl(p.icon));
    await item.deleteOne();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};