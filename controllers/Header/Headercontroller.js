const Header = require("../../models/header");
const multer  = require("multer");
const path    = require("path");

// ── Multer (logo upload) ──────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  allowed.test(path.extname(file.originalname).toLowerCase())
    ? cb(null, true)
    : cb(new Error("Images only!"), false);
};
exports.uploadLogo = multer({ storage, fileFilter }).single("logo");

// ── Helpers ───────────────────────────────────────────────────────────────────
const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const safeJsonParse = (value) => {
  if (typeof value !== "string") return value;
  const t = value.trim();
  if (!t) return value;
  if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
    try { return JSON.parse(t); } catch { return value; }
  }
  return value;
};

// Parse and validate the navItems array coming from the form
const parseNavItems = (raw) => {
  if (!raw) return undefined;
  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return undefined;

  return parsed
    .map((item) => {
      const base = {
        type:  item.type  || "link",
        label: item.label || "",
        side:  item.side  || "left",
        order: Number(item.order) || 0,
      };
      if (base.type === "link") {
        base.path = item.path || "/";
      } else {
        base.dropdown = {
          label: item.dropdown?.label || item.label || "",
          links: Array.isArray(item.dropdown?.links)
            ? item.dropdown.links
                .map((l) => ({ label: l.label || "", path: l.path || "/" }))
                .filter((l) => l.label)
            : [],
        };
      }
      return base;
    })
    .filter((item) => item.label);
};

// ── GET — fetch the single header document ────────────────────────────────────
exports.get = async (req, res) => {
  try {
    // We use findOne; if none exists yet, return an empty shell
    const header = await Header.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: header || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── UPSERT — create or replace the single header document ────────────────────
exports.upsert = async (req, res) => {
  try {
    const body = {};

    if (req.body.address        !== undefined) body.address        = req.body.address;
    if (req.body.phone          !== undefined) body.phone          = req.body.phone;
    if (req.body.yogaAllianceId !== undefined) body.yogaAllianceId = req.body.yogaAllianceId;
    if (req.body.facebookUrl    !== undefined) body.facebookUrl    = req.body.facebookUrl;
    if (req.body.instagramUrl   !== undefined) body.instagramUrl   = req.body.instagramUrl;
    if (req.body.logoUrl        !== undefined) body.logoUrl        = req.body.logoUrl;
    if (req.body.ctaLabel       !== undefined) body.ctaLabel       = req.body.ctaLabel;
    if (req.body.ctaPath        !== undefined) body.ctaPath        = req.body.ctaPath;

    if (req.body.navItems !== undefined) {
      const parsed = parseNavItems(req.body.navItems);
      if (parsed) body.navItems = parsed;
    }

    // Logo file upload overrides logoUrl
    if (req.file) body.logoUrl = imageUrl(req, req.file.filename);

    // findOneAndUpdate with upsert — always keeps exactly one document
    const updated = await Header.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};