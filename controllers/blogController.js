const Blog = require("../models/blog/BlogModel");
const multer = require("multer");
const path = require("path");

// ── Multer config (cover upload) ────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error("Images only!"), false);
};

const upload = multer({ storage, fileFilter });
exports.uploadCover = upload.single("cover");

const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const parseBoolean = (value) => {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
};

const buildBody = (req) => {
  const body = {};

  if (req.body.title !== undefined) body.title = req.body.title;
  if (req.body.slug !== undefined) body.slug = req.body.slug;
  if (req.body.category !== undefined) body.category = req.body.category;
  if (req.body.badge !== undefined) body.badge = req.body.badge;
  if (req.body.subtitle !== undefined) body.subtitle = req.body.subtitle;
  if (req.body.excerpt !== undefined) body.excerpt = req.body.excerpt;
  if (req.body.coverImage !== undefined) body.coverImage = req.body.coverImage;
  if (req.body.readTime !== undefined) body.readTime = req.body.readTime;
  if (req.body.contentHtml !== undefined) body.contentHtml = req.body.contentHtml;
  if (req.body.publishedAt !== undefined) {
    const date = req.body.publishedAt ? new Date(req.body.publishedAt) : null;
    if (date && !Number.isNaN(date.getTime())) body.publishedAt = date;
  }

  const published = parseBoolean(req.body.isPublished);
  if (published !== undefined) body.isPublished = published;

  if (req.file) body.coverImage = imageUrl(req, req.file.filename);

  if (!body.slug && body.title) body.slug = slugify(body.title);

  return body;
};

// ── CRUD ───────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const includeUnpublished =
      String(req.query.includeUnpublished || "").toLowerCase() === "true";

    const query = includeUnpublished ? {} : { isPublished: true };
    const data = await Blog.find(query).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const item = await Blog.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = buildBody(req);
    if (!body.publishedAt) body.publishedAt = new Date();
    const created = await Blog.create(body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const body = buildBody(req);
    const updated = await Blog.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    await item.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
