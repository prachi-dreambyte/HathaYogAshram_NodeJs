const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/homepage/HomepageVideoSectionController");

// ─── Multer Config ────────────────────────────────────────────

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "video-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/avi",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed (mp4, mpeg, ogg, webm, avi, mov, wmv)"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max
});

// ─── Routes ───────────────────────────────────────────────────

// GET    /api/home-video-section        → get all records
// POST   /api/home-video-section        → create new record
// GET    /api/home-video-section/:id    → get single record
// PUT    /api/home-video-section/:id    → update record
// DELETE /api/home-video-section/:id    → delete record

router.get("/", getAll);
router.post("/", upload.single("video"), create);
router.get("/:id", getOne);
router.put("/:id", upload.single("video"), update);
router.delete("/:id", remove);

module.exports = router;