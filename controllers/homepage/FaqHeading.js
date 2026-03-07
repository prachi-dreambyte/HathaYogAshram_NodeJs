const FaqHeading = require("../../models/homepage/FaqHeadingModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ─── Multer Setup (inside controller) ────────────────────────────────────────
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `faq-${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const valid =
    allowed.test(path.extname(file.originalname).toLowerCase()) &&
    allowed.test(file.mimetype);
  valid ? cb(null, true) : cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Export middleware so route can use it
exports.uploadImage = upload.single("image");

// ─── Helper ───────────────────────────────────────────────────────────────────
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  const fullPath = path.join(__dirname, "..", imagePath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
};

// ─── GET ALL ──────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const items = await FaqHeading.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET BY ID ────────────────────────────────────────────────────────────────
exports.getById = async (req, res) => {
  try {
    const item = await FaqHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const { mainHeading, subHeading } = req.body;

    if (!mainHeading || !subHeading) {
      return res.status(400).json({
        success: false,
        message: "mainHeading and subHeading are required",
      });
    }

    const newItem = await FaqHeading.create({
      mainHeading,
      subHeading,
      image: req.file ? `uploads/${req.file.filename}` : null,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const item = await FaqHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    const { mainHeading, subHeading } = req.body;

    if (req.file) {
      deleteImageFile(item.image);
      item.image = `uploads/${req.file.filename}`;
    }

    if (mainHeading) item.mainHeading = mainHeading;
    if (subHeading) item.subHeading = subHeading;

    await item.save();
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const item = await FaqHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    deleteImageFile(item.image);
    await FaqHeading.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── DELETE IMAGE ONLY ────────────────────────────────────────────────────────
exports.removeImage = async (req, res) => {
  try {
    const item = await FaqHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    deleteImageFile(item.image);
    item.image = null;
    await item.save();

    res.json({ success: true, message: "Image removed", data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};