const multer = require("multer");
const path = require("path");
const Footer = require("../../models/footer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  allowed.test(path.extname(file.originalname).toLowerCase())
    ? cb(null, true)
    : cb(new Error("Images only!"), false);
};

exports.uploadLogos = multer({ storage, fileFilter }).fields([
  { name: "primaryLogo", maxCount: 1 },
  { name: "secondaryLogo", maxCount: 1 },
]);

const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const safeJsonParse = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
};

const parseLinkSections = (raw) => {
  if (raw === undefined) return undefined;
  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((section) => ({
      title: section?.title || "",
      links: Array.isArray(section?.links)
        ? section.links
            .map((link) => ({
              label: link?.label || "",
              path: link?.path || "/",
            }))
            .filter((link) => link.label)
        : [],
    }))
    .filter((section) => section.title);
};

const parseContactItems = (raw) => {
  if (raw === undefined) return undefined;
  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => ({
      type: item?.type || "custom",
      value: item?.value || "",
      href: item?.href || "",
    }))
    .filter((item) => item.value);
};

const parseSocialLinks = (raw) => {
  if (raw === undefined) return undefined;
  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => ({
      platform: item?.platform || "",
      url: item?.url || "",
    }))
    .filter((item) => item.platform && item.url);
};

const parseKeywords = (raw) => {
  if (raw === undefined) return undefined;
  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => `${item || ""}`.trim()).filter(Boolean);
};

exports.get = async (req, res) => {
  try {
    const footer = await Footer.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: footer || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const body = {};

    if (req.body.aboutText !== undefined) body.aboutText = req.body.aboutText;
    if (req.body.primaryLogoUrl !== undefined) {
      body.primaryLogoUrl = req.body.primaryLogoUrl;
    }
    if (req.body.secondaryLogoUrl !== undefined) {
      body.secondaryLogoUrl = req.body.secondaryLogoUrl;
    }
    if (req.body.trustText !== undefined) body.trustText = req.body.trustText;
    if (req.body.contactTitle !== undefined) {
      body.contactTitle = req.body.contactTitle;
    }
    if (req.body.copyrightText !== undefined) {
      body.copyrightText = req.body.copyrightText;
    }

    const linkSections = parseLinkSections(req.body.linkSections);
    if (linkSections !== undefined) body.linkSections = linkSections;

    const contactItems = parseContactItems(req.body.contactItems);
    if (contactItems !== undefined) body.contactItems = contactItems;

    const socialLinks = parseSocialLinks(req.body.socialLinks);
    if (socialLinks !== undefined) body.socialLinks = socialLinks;

    const keywords = parseKeywords(req.body.keywords);
    if (keywords !== undefined) body.keywords = keywords;

    if (req.files?.primaryLogo?.[0]) {
      body.primaryLogoUrl = imageUrl(req, req.files.primaryLogo[0].filename);
    }

    if (req.files?.secondaryLogo?.[0]) {
      body.secondaryLogoUrl = imageUrl(req, req.files.secondaryLogo[0].filename);
    }

    const updated = await Footer.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
