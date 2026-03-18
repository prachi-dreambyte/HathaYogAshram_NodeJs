const Course = require("../../models/courses/CourseModel");
const CourseBatch = require("../../models/courses/CourseBatchModel");
const CourseBooking = require("../../models/courses/CourseBookingModel");
const {
  buildBatchView,
  buildBookedMap,
} = require("../../utils/courseAvailability");
const multer = require("multer");
const path = require("path");

// ── Multer ────────────────────────────────────────────────────────────────────
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
exports.uploadCourseImages = upload.fields([
  { name: "banner", maxCount: 1 },
  { name: "cardImage", maxCount: 1 },
  { name: "retreatImage", maxCount: 1 },
  { name: "heroBannerImage", maxCount: 1 },
  { name: "toBringImage", maxCount: 1 },
  { name: "accommodationImage", maxCount: 1 },
  { name: "foodImage", maxCount: 1 },
  { name: "whyChooseImage", maxCount: 1 },
  { name: "teacherImages", maxCount: 20 },
]);

// ── Helpers ───────────────────────────────────────────────────────────────────
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
    try { return JSON.parse(trimmed); } catch { return value; }
  }
  return value;
};

const parseCurriculum = (req) => {
  if (req.body.curriculum) {
    const parsed = safeJsonParse(req.body.curriculum);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        title: item.title || "",
        items: Array.isArray(item.items)
          ? item.items
          : String(item.items || "").split(",").map((v) => v.trim()).filter(Boolean),
      }));
    }
  }
  const items = [];
  for (let i = 0; i < 10; i++) {
    const title = req.body[`curriculumTitle_${i}`];
    const list = req.body[`curriculumItems_${i}`];
    if (!title && !list) continue;
    items.push({
      title: title || "",
      items: String(list || "").split(",").map((v) => v.trim()).filter(Boolean),
    });
  }
  return items;
};

const parseArrayField = (value) => {
  if (!value) return [];
  const parsed = safeJsonParse(value);
  if (Array.isArray(parsed)) return parsed;
  return String(value).split(",").map((v) => v.trim()).filter(Boolean);
};

const parseAccommodation = (raw) => {
  if (!raw) return undefined;
  const parsed = safeJsonParse(raw);
  if (typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
  return {
    tag: parsed.tag || "",
    title: parsed.title || "",
    image: parsed.image || "",
    rooms: Array.isArray(parsed.rooms)
      ? parsed.rooms.map((r) => ({ type: r.type || "", description: r.description || "" }))
      : [],
    features: Array.isArray(parsed.features)
      ? parsed.features.map((f) => ({ label: f.label || "", detail: f.detail || "" }))
      : [],
  };
};

const parseFood = (raw) => {
  if (!raw) return undefined;
  const parsed = safeJsonParse(raw);
  if (typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
  return {
    tag: parsed.tag || "",
    title: parsed.title || "",
    image: parsed.image || "",
    meals: Array.isArray(parsed.meals)
      ? parsed.meals.map((m) => ({ meal: m.meal || "", description: m.description || "" }))
      : [],
  };
};

const parseWhyChoose = (raw) => {
  if (!raw) return undefined;
  const parsed = safeJsonParse(raw);
  if (typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
  return {
    tag: parsed.tag || "",
    title: parsed.title || "",
    image: parsed.image || "",
    idealForTitle: parsed.idealForTitle || "",
    idealFor: Array.isArray(parsed.idealFor) ? parsed.idealFor.filter(Boolean) : [],
    benefitsTitle: parsed.benefitsTitle || "",
    benefits: Array.isArray(parsed.benefits) ? parsed.benefits.filter(Boolean) : [],
  };
};

// ── NEW: parse ourCoursesSection ──────────────────────────────────────────────
const parseOurCoursesSection = (raw) => {
  if (!raw) return undefined;
  const parsed = safeJsonParse(raw);
  if (typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
  return {
    tag: parsed.tag || "",
    title: parsed.title || "",
    description: parsed.description || "",
  };
};

const parseCourseBody = (req) => {
  const body = {};

  if (req.body.title !== undefined) body.title = req.body.title;
  if (req.body.slug !== undefined) body.slug = req.body.slug;
  if (req.body.shortTitle !== undefined) body.shortTitle = req.body.shortTitle;
  if (req.body.category !== undefined) body.category = req.body.category;
  if (req.body.homeSections !== undefined)
    body.homeSections = parseArrayField(req.body.homeSections);
  if (req.body.featured !== undefined)
    body.featured = req.body.featured === "true" || req.body.featured === true;
  if (req.body.homeOrder !== undefined)
    body.homeOrder = req.body.homeOrder ? Number(req.body.homeOrder) : 0;
  if (req.body.legacyPath !== undefined) body.legacyPath = req.body.legacyPath;
  if (req.body.banner !== undefined) body.banner = req.body.banner;
  if (req.body.description !== undefined) body.description = req.body.description;
  if (req.body.duration !== undefined) body.duration = req.body.duration;
  if (req.body.level !== undefined) body.level = req.body.level;
  if (req.body.location !== undefined) body.location = req.body.location;
  if (req.body.included !== undefined) body.included = req.body.included;
  if (req.body.curriculum !== undefined || req.body.curriculumTitle_0 !== undefined)
    body.curriculum = parseCurriculum(req);

  if (req.body.card !== undefined) body.card = safeJsonParse(req.body.card);
  if (req.body.teacherTraining !== undefined)
    body.teacherTraining = safeJsonParse(req.body.teacherTraining);
  if (req.body.kundalini !== undefined) body.kundalini = safeJsonParse(req.body.kundalini);
  if (req.body.retreat !== undefined) body.retreat = safeJsonParse(req.body.retreat);
  if (req.body.ayurveda !== undefined) body.ayurveda = safeJsonParse(req.body.ayurveda);
  if (req.body.home !== undefined) body.home = safeJsonParse(req.body.home);
  if (req.body.content !== undefined) body.content = safeJsonParse(req.body.content);

  if (req.body.accommodation !== undefined) {
    const parsed = parseAccommodation(req.body.accommodation);
    if (parsed) body.accommodation = parsed;
  }
  if (req.body.food !== undefined) {
    const parsed = parseFood(req.body.food);
    if (parsed) body.food = parsed;
  }
  if (req.body.whyChoose !== undefined) {
    const parsed = parseWhyChoose(req.body.whyChoose);
    if (parsed) body.whyChoose = parsed;
  }
  // ── NEW ────────────────────────────────────────────────────────────────────
  if (req.body.ourCoursesSection !== undefined) {
    const parsed = parseOurCoursesSection(req.body.ourCoursesSection);
    if (parsed) body.ourCoursesSection = parsed;
  }

  // Uploaded images (multipart/form-data)
  if (req.files?.banner?.[0]) body.banner = imageUrl(req, req.files.banner[0].filename);

  if (req.files?.cardImage?.[0]) {
    body.card = body.card && typeof body.card === "object" ? body.card : {};
    body.card.image = imageUrl(req, req.files.cardImage[0].filename);
  }

  if (req.files?.teacherImages?.length) {
    body.teacherTraining =
      body.teacherTraining && typeof body.teacherTraining === "object"
        ? body.teacherTraining
        : {};
    body.teacherTraining.images = req.files.teacherImages.map((f) =>
      imageUrl(req, f.filename)
    );
  }

  if (req.files?.retreatImage?.[0]) {
    body.retreat = body.retreat && typeof body.retreat === "object" ? body.retreat : {};
    body.retreat.image = imageUrl(req, req.files.retreatImage[0].filename);
  }

  if (req.files?.accommodationImage?.[0]) {
    body.accommodation =
      body.accommodation && typeof body.accommodation === "object" ? body.accommodation : {};
    body.accommodation.image = imageUrl(req, req.files.accommodationImage[0].filename);
  }

  if (req.files?.foodImage?.[0]) {
    body.food = body.food && typeof body.food === "object" ? body.food : {};
    body.food.image = imageUrl(req, req.files.foodImage[0].filename);
  }

  if (req.files?.whyChooseImage?.[0]) {
    body.whyChoose =
      body.whyChoose && typeof body.whyChoose === "object" ? body.whyChoose : {};
    body.whyChoose.image = imageUrl(req, req.files.whyChooseImage[0].filename);
  }

  if (req.files?.heroBannerImage?.[0]) {
    body.content = body.content && typeof body.content === "object" ? body.content : {};
    body.content.hero = body.content.hero && typeof body.content.hero === "object" ? body.content.hero : {};
    body.content.hero.bannerImage = imageUrl(req, req.files.heroBannerImage[0].filename);
  }

  if (req.files?.toBringImage?.[0]) {
    body.content = body.content && typeof body.content === "object" ? body.content : {};
    body.content.included =
      body.content.included && typeof body.content.included === "object"
        ? body.content.included
        : {};
    body.content.included.toBringImage = imageUrl(req, req.files.toBringImage[0].filename);
  }

  return body;
};

const attachBatches = async (course, { upcomingOnly = false } = {}) => {
  const batches = await CourseBatch.find({ course: course._id }).sort({ startDate: 1 });
  const batchIds = batches.map((b) => b._id);
  const availabilityMap = await buildBookedMap(batchIds);
  const now = new Date();
  return batches
    .filter((b) => (upcomingOnly ? b.startDate >= now : true))
    .map((b) => buildBatchView(b, availabilityMap.get(String(b._id))));
};

// ── CRUD ──────────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.featured === "true") query.featured = true;
    if (req.query.category) query.category = req.query.category;
    if (req.query.homeSection) query.homeSections = req.query.homeSection;

    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const withBatches = req.query.withBatches === "true";
    const courses = await Course.find(query).sort({ homeOrder: 1, createdAt: -1 }).limit(limit);

    if (!withBatches) return res.json({ success: true, data: courses });

    const data = await Promise.all(
      courses.map(async (course) => {
        const batches = await attachBatches(course, { upcomingOnly: true });
        const nextBatch = batches.find((b) => b.availableSeats > 0) || batches[0];
        return { ...course.toObject(), batches, nextBatch };
      })
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ success: false, message: "Not found" });
    const batches = await attachBatches(course);
    res.json({ success: true, data: { ...course.toObject(), batches } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBatchesForCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Not found" });
    const batches = await attachBatches(course);
    res.json({ success: true, data: batches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── NEW: get related courses (same category, excluding current) ───────────────
// GET /api/courses/:id/related?limit=4
exports.getRelated = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select("category slug");
    if (!course) return res.status(404).json({ success: false, message: "Not found" });

    const limit = req.query.limit ? Number(req.query.limit) : 4;

    const related = await Course.find({
      category: course.category,
      _id: { $ne: course._id },
    })
      .sort({ homeOrder: 1 })
      .limit(limit)
      .select("title shortTitle slug card teacherTraining category duration level");

    res.json({ success: true, data: related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = parseCourseBody(req);
    if (!body.slug)
      body.slug = String(body.title || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    const created = await Course.create(body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const body = parseCourseBody(req);
    const updated = await Course.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Not found" });
    await CourseBatch.deleteMany({ course: course._id });
    await CourseBooking.deleteMany({ course: course._id });
    await course.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
