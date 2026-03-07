const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ctrl = require("../controllers/AboutUs/FounderSectionController");

// ── Multer config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({ storage });

// Accept lastIcon (image) + up to 4 video files: videoFile_0 … videoFile_3
const uploadFields = upload.fields([
  { name: "lastIcon",    maxCount: 1 },
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