const express = require("express");
const router  = express.Router();
const multer  = require("multer");
const path    = require("path");
const ctrl    = require("../controllers/AboutUs/AboutFounderDetailsController");

// ── Multer config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error("Images only!"), false);
};

const upload = multer({ storage, fileFilter });

// Accept: founder img + philosophy icon for each of 4 items
const uploadFields = upload.fields([
  { name: "img",          maxCount: 1 },
  { name: "philoIcon_0",  maxCount: 1 },
  { name: "philoIcon_1",  maxCount: 1 },
  { name: "philoIcon_2",  maxCount: 1 },
  { name: "philoIcon_3",  maxCount: 1 },
]);

// ── Routes ────────────────────────────────────────────────────────────────────
router.get("/",       ctrl.getAll);
router.get("/:id",    ctrl.getOne);
router.post("/",      uploadFields, ctrl.create);
router.put("/:id",    uploadFields, ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;