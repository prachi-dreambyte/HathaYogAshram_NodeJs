const express = require("express");
const router = express.Router();
const controller = require("../controllers/AboutUs/AboutTeacherHeadingController");
const multer = require("multer");

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Dynamic Fields
const uploadFields = [
  { name: "bannerImage", maxCount: 1 },
];

// Teacher images (max 10)
for (let i = 0; i < 10; i++) {
  uploadFields.push({ name: `teacherImage_${i}`, maxCount: 1 });
}

// Videos + thumbnails
for (let i = 0; i < 10; i++) {
  uploadFields.push({ name: `video_${i}`, maxCount: 1 });
  uploadFields.push({ name: `thumbnail_${i}`, maxCount: 1 });
}

router.post(
  "/create",
  upload.fields(uploadFields),
  controller.createAboutTeacher
);

router.get("/", controller.getAll);
router.put("/:id", upload.fields(uploadFields), controller.updateAboutTeacher);

module.exports = router;
