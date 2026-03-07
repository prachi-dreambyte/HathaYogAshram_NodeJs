const express = require("express");
const router  = express.Router();
const multer  = require("multer");
const ctrl    = require("../controllers/AboutUs/AboutTeacherHeadingController");

// ── Multer config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({ storage });

// Accept up to 4 video file slots
const uploadFields = upload.fields([
  { name: "videoFile_0", maxCount: 1 },
  { name: "videoFile_1", maxCount: 1 },
  { name: "videoFile_2", maxCount: 1 },
  { name: "videoFile_3", maxCount: 1 },
]);

// ── Routes ────────────────────────────────────────────────────────────────────
router.get("/",       ctrl.getAll);
router.get("/:id",    ctrl.getOne);
router.post("/",      uploadFields, ctrl.create);
router.put("/:id",    uploadFields, ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;