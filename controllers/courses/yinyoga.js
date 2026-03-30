const multer = require("multer");
const path = require("path");
const YinYoga = require("../../models/courses/yinyoga");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error("Images only!"), false);
};

const upload = multer({ storage, fileFilter });
exports.uploadYinYogaAssets = upload.any();

const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const safeJsonParse = (value, fallback = value) => {
  if (typeof value !== "string") return value ?? fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    return fallback;
  }
};

const stripDocumentMeta = (doc = {}) => {
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return rest;
};

const normalizeStringArray = (value) => {
  if (!value) return [];
  const parsed = safeJsonParse(value, value);
  if (Array.isArray(parsed)) {
    return parsed.map((item) => String(item || "").trim()).filter(Boolean);
  }
  return String(parsed)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeStats = (value) => {
  const parsed = safeJsonParse(value, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => ({
    num: item?.num || "",
    label: item?.label || "",
  }));
};

const normalizeModules = (value) => {
  const parsed = safeJsonParse(value, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => ({
    img: item?.img || "",
    title: item?.title || "",
    desc: item?.desc || "",
    tags: Array.isArray(item?.tags)
      ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
      : normalizeStringArray(item?.tags || []),
  }));
};

const normalizePhilosophy = (value) => {
  const parsed = safeJsonParse(value, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => ({
    img: item?.img || "",
    title: item?.title || "",
    text: item?.text || "",
  }));
};

const normalizeAnatomyPoints = (value) => {
  const parsed = safeJsonParse(value, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => ({
    strong: item?.strong || "",
    text: item?.text || "",
  }));
};

const normalizeWhoCanJoin = (value) => {
  const parsed = safeJsonParse(value, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((item) => ({
    img: item?.img || "",
    label: item?.label || "",
  }));
};

const normalizeCta = (value) => {
  const parsed = safeJsonParse(value, {});
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: "",
    };
  }

  return {
    title: parsed.title || "",
    description: parsed.description || "",
    buttonText: parsed.buttonText || "",
    buttonLink: parsed.buttonLink || "",
    image: parsed.image || "",
  };
};

const applyIndexedImages = (items, files, prefix, req) => {
  if (!Array.isArray(items) || !Array.isArray(files)) return items;

  files.forEach((file) => {
    if (!file.fieldname.startsWith(prefix)) return;
    const index = Number(file.fieldname.replace(prefix, ""));
    if (!Number.isInteger(index) || !items[index]) return;
    items[index].img = imageUrl(req, file.filename);
  });

  return items;
};

const buildPayload = (req) => {
  const body = {};
  const files = Array.isArray(req.files) ? req.files : [];

  const simpleFields = [
    "heroEyebrow",
    "heroTitle",
    "heroSubtitle",
    "heroImage",
    "aboutSectionLabel",
    "aboutSectionTitle",
    "aboutSectionDescription",
    "philosophySectionLabel",
    "philosophySectionTitle",
    "philosophySectionDescription",
    "anatomySectionLabel",
    "anatomySectionTitle",
    "anatomyIntro",
    "whoSectionLabel",
    "whoSectionTitle",
    "whoSectionDescription",
    "ctaSectionLabel",
    "ctaSectionTitle",
    "ctaDescription",
  ];

  simpleFields.forEach((field) => {
    if (req.body[field] !== undefined) body[field] = req.body[field];
  });

  if (req.body.heroBadges !== undefined) {
    body.heroBadges = normalizeStringArray(req.body.heroBadges);
  }
  if (req.body.stats !== undefined) {
    body.stats = normalizeStats(req.body.stats);
  }
  if (req.body.modules !== undefined) {
    body.modules = normalizeModules(req.body.modules);
  }
  if (req.body.poses !== undefined) {
    body.poses = normalizeStringArray(req.body.poses);
  }
  if (req.body.philosophy !== undefined) {
    body.philosophy = normalizePhilosophy(req.body.philosophy);
  }
  if (req.body.anatomyPoints !== undefined) {
    body.anatomyPoints = normalizeAnatomyPoints(req.body.anatomyPoints);
  }
  if (req.body.whoCanJoin !== undefined) {
    body.whoCanJoin = normalizeWhoCanJoin(req.body.whoCanJoin);
  }
  if (req.body.cta !== undefined) {
    body.cta = normalizeCta(req.body.cta);
  }

  const heroImageFile = files.find((file) => file.fieldname === "heroImage");
  if (heroImageFile) {
    body.heroImage = imageUrl(req, heroImageFile.filename);
  }

  const ctaImageFile = files.find((file) => file.fieldname === "ctaImage");
  if (ctaImageFile) {
    body.cta = body.cta || normalizeCta(req.body.cta);
    body.cta.image = imageUrl(req, ctaImageFile.filename);
  }

  if (Array.isArray(body.modules)) {
    body.modules = applyIndexedImages(body.modules, files, "module_img_", req);
  }
  if (Array.isArray(body.philosophy)) {
    body.philosophy = applyIndexedImages(
      body.philosophy,
      files,
      "philosophy_img_",
      req
    );
  }
  if (Array.isArray(body.whoCanJoin)) {
    body.whoCanJoin = applyIndexedImages(body.whoCanJoin, files, "who_img_", req);
  }

  return body;
};

const mergePayloadWithExisting = (existingDoc, payload) => {
  const existing = stripDocumentMeta(
    existingDoc?.toObject ? existingDoc.toObject() : existingDoc || {}
  );

  return {
    ...existing,
    ...payload,
    cta: payload.cta !== undefined
      ? {
        ...(existing.cta || {}),
        ...(payload.cta || {}),
      }
      : existing.cta,
  };
};

exports.createYinYoga = async (req, res) => {
  try {
    const payload = buildPayload(req);
    const existing = await YinYoga.findOne().sort({ updatedAt: -1, createdAt: -1 });

    if (existing) {
      const mergedPayload = mergePayloadWithExisting(existing, payload);
      const doc = await YinYoga.findByIdAndUpdate(existing._id, mergedPayload, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        success: true,
        message: "Yin Yoga content updated successfully",
        data: doc,
      });
    }

    const doc = await YinYoga.create(payload);

    res.status(201).json({
      success: true,
      message: "Yin Yoga content created successfully",
      data: doc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getYinYoga = async (req, res) => {
  try {
    const docs = await YinYoga.find().sort({ updatedAt: -1, createdAt: -1 });

    res.json({
      success: true,
      current: docs[0] || null,
      data: docs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateYinYoga = async (req, res) => {
  try {
    const payload = buildPayload(req);
    const existing = await YinYoga.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ success: false, message: "Yin Yoga content not found" });
    }

    const mergedPayload = mergePayloadWithExisting(existing, payload);
    const updated = await YinYoga.findByIdAndUpdate(req.params.id, mergedPayload, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Yin Yoga content updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteYinYoga = async (req, res) => {
  try {
    const deleted = await YinYoga.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Yin Yoga content not found" });
    }

    res.json({
      success: true,
      message: "Yin Yoga content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
