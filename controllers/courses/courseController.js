const Course = require("../../models/courses/CourseModel");
const CourseBatch = require("../../models/courses/CourseBatchModel");
const CourseBooking = require("../../models/courses/CourseBookingModel");
const multer = require("multer");
const path = require("path");

// ── Multer config (banner upload) ────────────────────────────────────────────
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

// Expose upload middleware
exports.uploadBanner = upload.single("banner");

// ── Helpers ────────────────────────────────────────────────────────────────
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
    } catch (err) {
      return value;
    }
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
          : String(item.items || "")
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean),
      }));
    }
  }

  const items = [];
  for (let i = 0; i < 10; i++) {
    const title = req.body[`curriculumTitle_${i}`];
    const list = req.body[`curriculumItems_${i}`];
    if (!title && !list) continue;
    const parsedItems = String(list || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    items.push({ title: title || "", items: parsedItems });
  }
  return items;
};

const parseArrayField = (value) => {
  if (!value) return [];
  const parsed = safeJsonParse(value);
  if (Array.isArray(parsed)) return parsed;
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const parseCourseBody = (req) => {
  const body = {};

  if (req.body.title !== undefined) body.title = req.body.title;
  if (req.body.slug !== undefined) body.slug = req.body.slug;
  if (req.body.shortTitle !== undefined) body.shortTitle = req.body.shortTitle;
  if (req.body.category !== undefined) body.category = req.body.category;
  if (req.body.homeSections !== undefined) body.homeSections = parseArrayField(req.body.homeSections);
  if (req.body.featured !== undefined) {
    body.featured = req.body.featured === "true" || req.body.featured === true;
  }
  if (req.body.homeOrder !== undefined) {
    body.homeOrder = req.body.homeOrder ? Number(req.body.homeOrder) : 0;
  }
  if (req.body.legacyPath !== undefined) body.legacyPath = req.body.legacyPath;

  if (req.body.banner !== undefined) body.banner = req.body.banner;
  if (req.body.description !== undefined) body.description = req.body.description;
  if (req.body.duration !== undefined) body.duration = req.body.duration;
  if (req.body.level !== undefined) body.level = req.body.level;
  if (req.body.location !== undefined) body.location = req.body.location;
  if (req.body.included !== undefined) body.included = req.body.included;
  if (req.body.curriculum !== undefined || req.body.curriculumTitle_0 !== undefined) {
    body.curriculum = parseCurriculum(req);
  }

  if (req.body.card !== undefined) body.card = safeJsonParse(req.body.card);
  if (req.body.teacherTraining !== undefined) body.teacherTraining = safeJsonParse(req.body.teacherTraining);
  if (req.body.kundalini !== undefined) body.kundalini = safeJsonParse(req.body.kundalini);
  if (req.body.retreat !== undefined) body.retreat = safeJsonParse(req.body.retreat);
  if (req.body.ayurveda !== undefined) body.ayurveda = safeJsonParse(req.body.ayurveda);
  if (req.body.home !== undefined) body.home = safeJsonParse(req.body.home);
  if (req.body.content !== undefined) body.content = safeJsonParse(req.body.content);

  if (req.file) {
    body.banner = imageUrl(req, req.file.filename);
  }

  return body;
};

const buildAvailabilityMap = async (batchIds) => {
  if (!batchIds.length) return new Map();
  const bookings = await CourseBooking.aggregate([
    {
      $match: {
        batch: { $in: batchIds },
        status: { $ne: "cancelled" },
      },
    },
    { $group: { _id: "$batch", total: { $sum: "$seats" } } },
  ]);

  const map = new Map();
  bookings.forEach((item) => {
    map.set(String(item._id), item.total);
  });
  return map;
};

const buildBatchView = (batch, bookedSeats) => {
  const availableSeats = Math.max((batch.capacity || 0) - bookedSeats, 0);
  let statusLabel = batch.status;
  let statusType = "primary";

  if (!statusLabel) {
    if (availableSeats <= 0) {
      statusLabel = "Fully Booked";
      statusType = "success";
    } else {
      statusLabel = `${availableSeats} Seats Left`;
      statusType = "primary";
    }
  } else {
    const lowered = statusLabel.toLowerCase();
    if (lowered.includes("waiting")) statusType = "warning";
    if (lowered.includes("fully")) statusType = "success";
  }

  return {
    _id: batch._id,
    course: batch.course,
    startDate: batch.startDate,
    endDate: batch.endDate,
    capacity: batch.capacity,
    priceShared: batch.priceShared,
    priceSharedOld: batch.priceSharedOld,
    pricePrivate: batch.pricePrivate,
    pricePrivateOld: batch.pricePrivateOld,
    statusLabel,
    statusType,
    availableSeats,
  };
};

const attachBatches = async (course, { upcomingOnly = false } = {}) => {
  const batches = await CourseBatch.find({ course: course._id }).sort({
    startDate: 1,
  });
  const batchIds = batches.map((b) => b._id);
  const availabilityMap = await buildAvailabilityMap(batchIds);
  const now = new Date();

  return batches
    .filter((batch) => (upcomingOnly ? batch.startDate >= now : true))
    .map((batch) =>
      buildBatchView(batch, availabilityMap.get(String(batch._id)) || 0)
    );
};

// ── CRUD ───────────────────────────────────────────────────────────────────

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.featured === "true") query.featured = true;
    if (req.query.category) query.category = req.query.category;
    if (req.query.homeSection) query.homeSections = req.query.homeSection;

    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const withBatches = req.query.withBatches === "true";

    const courses = await Course.find(query)
      .sort({ homeOrder: 1, createdAt: -1 })
      .limit(limit);

    if (!withBatches) {
      return res.json({ success: true, data: courses });
    }

    const data = await Promise.all(
      courses.map(async (course) => {
        const batches = await attachBatches(course, { upcomingOnly: true });
        const nextBatch = batches.find((b) => b.availableSeats > 0) || batches[0];
        return {
          ...course.toObject(),
          batches,
          nextBatch,
        };
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

exports.create = async (req, res) => {
  try {
    const body = parseCourseBody(req);
    if (!body.slug) {
      body.slug = String(body.title || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const created = await Course.create(body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const body = parseCourseBody(req);
    const updated = await Course.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
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
